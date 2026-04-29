import Taro from '@tarojs/taro';
import Button from '@taroify/core/button';
import Field from '@taroify/core/field';
import Input from '@taroify/core/input';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useAppStore } from '@/features/app-context/store';
import { createFamily, getFamilies } from '@/features/family/api';
import { Family } from '@/features/family/types';
import { useZodForm } from '@/shared/forms/use-zod-form';
import { FormSection } from '@/shared/ui/form-section';
import { PageLayout } from '@/shared/ui/page-layout';
import { RecordList } from '@/shared/ui/record-list';

const familySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Family name must be at least 2 characters')
    .max(30, 'Family name must be 30 characters or fewer'),
});

export function FamilyPageView() {
  const [families, setFamilies] = useState<Family[]>([]);
  const currentFamilyId = useAppStore((state) => state.currentFamilyId);
  const hydrated = useAppStore((state) => state.hydrated);
  const setCurrentFamilyId = useAppStore((state) => state.setCurrentFamilyId);
  const form = useZodForm(familySchema, {
    name: 'My Family',
  });

  async function loadFamilies() {
    try {
      const data = await getFamilies();
      setFamilies(data);
    } catch {
      Taro.showToast({ title: 'Load failed', icon: 'none' });
    }
  }

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    void loadFamilies();
  }, [hydrated]);

  async function handleCreateFamily() {
    await form.submit(async (values) => {
      const family = await createFamily({ name: values.name });
      setCurrentFamilyId(family.id);
      await loadFamilies();
      Taro.showToast({ title: 'Created', icon: 'success' });
    });
  }

  const familyItems = useMemo(
    () =>
      families.map((family) => ({
        id: family.id,
        title: family.name,
        description: `${family.members.length} member records`,
        actionLabel: 'Use this family',
      })),
    [families],
  );

  return (
    <PageLayout
      title="Family"
      description="Create a family context and switch the active family used by later pages."
      contextLabel="Current familyId"
      contextValue={currentFamilyId}
      hydrated={hydrated}
    >
      <FormSection title="Create family">
        <Field label="Family name" feedback={form.errors.name}>
          <Input
            value={form.values.name}
            placeholder="Enter family name"
            clearable
            onChange={(event) => form.setFieldValue('name', event.detail.value)}
          />
        </Field>
        <Button
          block
          color="primary"
          loading={form.submitting}
          style={{ marginTop: '12px' }}
          onClick={handleCreateFamily}
        >
          Create Family
        </Button>
      </FormSection>

      <FormSection title="Available families">
        <RecordList
          items={familyItems}
          emptyText="No family records yet."
          onAction={(id) => setCurrentFamilyId(id)}
        />
      </FormSection>
    </PageLayout>
  );
}

export default FamilyPageView;
