import Taro from '@tarojs/taro';
import Button from '@taroify/core/button';
import Field from '@taroify/core/field';
import Input from '@taroify/core/input';
import Radio from '@taroify/core/radio';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useAppStore } from '@/features/app-context/store';
import { createBaby, getBabies } from '@/features/baby/api';
import { BABY_GENDERS, Baby, BabyGender } from '@/features/baby/types';
import { useZodForm } from '@/shared/forms/use-zod-form';
import { FormSection } from '@/shared/ui/form-section';
import { PageLayout } from '@/shared/ui/page-layout';
import { RecordList } from '@/shared/ui/record-list';

interface BabyFormValues {
  name: string;
  nickname: string;
  birthday: string;
  gender: BabyGender;
}

const babySchema: z.ZodType<BabyFormValues> = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Baby name is required')
    .max(30, 'Keep the name under 30 characters'),
  nickname: z.string().trim().max(20, 'Nickname must be 20 characters or fewer'),
  birthday: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Birthday must use YYYY-MM-DD'),
  gender: z.enum(BABY_GENDERS),
});

export function BabyPageView() {
  const [babies, setBabies] = useState<Baby[]>([]);
  const familyId = useAppStore((state) => state.currentFamilyId);
  const currentBabyId = useAppStore((state) => state.currentBabyId);
  const hydrated = useAppStore((state) => state.hydrated);
  const setCurrentBabyId = useAppStore((state) => state.setCurrentBabyId);
  const form = useZodForm<BabyFormValues>(babySchema, {
    name: 'Test Baby',
    nickname: 'Little One',
    birthday: '2024-06-01',
    gender: 'MALE',
  });

  async function loadBabies() {
    if (!familyId) {
      setBabies([]);
      return;
    }

    try {
      const data = await getBabies(familyId);
      setBabies(data);
    } catch {
      Taro.showToast({ title: 'Load failed', icon: 'none' });
    }
  }

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    void loadBabies();
  }, [familyId, hydrated]);

  async function handleCreateBaby() {
    if (!familyId) {
      Taro.showToast({ title: 'Create family first', icon: 'none' });
      return;
    }

    await form.submit(async (values) => {
      const baby = await createBaby({
        familyId,
        name: values.name,
        nickname: values.nickname || undefined,
        gender: values.gender,
        birthday: `${values.birthday}T00:00:00.000Z`,
      });

      setCurrentBabyId(baby.id);
      await loadBabies();
      Taro.showToast({ title: 'Created', icon: 'success' });
    });
  }

  const babyItems = useMemo(
    () =>
      babies.map((baby) => ({
        id: baby.id,
        title: baby.name,
        description: `${baby.gender} | ${baby.birthday.slice(0, 10)}`,
        actionLabel: 'Use this baby',
      })),
    [babies],
  );

  return (
    <PageLayout
      title="Baby"
      description="Create a baby under the active family and choose which baby later records belong to."
      contextLabel="Current familyId"
      contextValue={familyId}
      hydrated={hydrated}
    >
      <FormSection title="Create baby">
        <Field label="Baby name" feedback={form.errors.name}>
          <Input
            value={form.values.name}
            placeholder="Baby name"
            clearable
            onChange={(event) => form.setFieldValue('name', event.detail.value)}
          />
        </Field>
        <Field label="Nickname" feedback={form.errors.nickname}>
          <Input
            value={form.values.nickname}
            placeholder="Nickname"
            clearable
            onChange={(event) => form.setFieldValue('nickname', event.detail.value)}
          />
        </Field>
        <Field label="Birthday" feedback={form.errors.birthday}>
          <Input
            value={form.values.birthday}
            placeholder="YYYY-MM-DD"
            onChange={(event) => form.setFieldValue('birthday', event.detail.value)}
          />
        </Field>
        <Field label="Gender" feedback={form.errors.gender}>
          <Radio.Group
            value={form.values.gender}
            direction="horizontal"
            onChange={(value) =>
              form.setFieldValue('gender', value as (typeof BABY_GENDERS)[number])
            }
          >
            {BABY_GENDERS.map((gender) => (
              <Radio key={gender} name={gender}>
                {gender}
              </Radio>
            ))}
          </Radio.Group>
        </Field>
        <Button
          block
          color="primary"
          loading={form.submitting}
          style={{ marginTop: '12px' }}
          onClick={handleCreateBaby}
        >
          Create Baby
        </Button>
      </FormSection>

      <FormSection
        title={`Available babies${currentBabyId ? ` (active: ${currentBabyId})` : ''}`}
      >
        <RecordList
          items={babyItems}
          emptyText="No baby records yet."
          onAction={(id) => setCurrentBabyId(id)}
        />
      </FormSection>
    </PageLayout>
  );
}

export default BabyPageView;
