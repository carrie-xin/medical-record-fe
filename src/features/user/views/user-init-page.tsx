import Taro from '@tarojs/taro';
import Button from '@taroify/core/button';
import Field from '@taroify/core/field';
import Input from '@taroify/core/input';
import { z } from 'zod';
import { useAppStore } from '@/features/app-context/store';
import { createUser } from '@/features/user/api';
import { useZodForm } from '@/shared/forms/use-zod-form';
import { FormSection } from '@/shared/ui/form-section';
import { PageLayout } from '@/shared/ui/page-layout';

const userSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(2, 'Nickname must be at least 2 characters')
    .max(20, 'Nickname must be 20 characters or fewer'),
});

export function UserInitPageView() {
  const currentUserId = useAppStore((state) => state.currentUserId);
  const hydrated = useAppStore((state) => state.hydrated);
  const setCurrentUserId = useAppStore((state) => state.setCurrentUserId);
  const form = useZodForm(userSchema, {
    nickname: 'Test Parent',
  });

  async function handleCreateUser() {
    await form.submit(async (values) => {
      const user = await createUser({ nickname: values.nickname });
      setCurrentUserId(user.id);
      Taro.showToast({ title: 'Created', icon: 'success' });
    });
  }

  return (
    <PageLayout
      title="User Init"
      description="Create the current development user before moving into the family and baby flow."
      contextLabel="Current userId"
      contextValue={currentUserId}
      hydrated={hydrated}
    >
      <FormSection title="Create dev user">
        <Field label="Nickname" feedback={form.errors.nickname}>
          <Input
            value={form.values.nickname}
            placeholder="Enter nickname"
            clearable
            onChange={(event) => form.setFieldValue('nickname', event.detail.value)}
          />
        </Field>
        <Button
          block
          color="primary"
          loading={form.submitting}
          style={{ marginTop: '12px' }}
          onClick={handleCreateUser}
        >
          Create Dev User
        </Button>
      </FormSection>
    </PageLayout>
  );
}

export default UserInitPageView;
