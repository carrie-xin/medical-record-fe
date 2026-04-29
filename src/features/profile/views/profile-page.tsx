import Taro from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import Button from '@taroify/core/button';
import Tag from '@taroify/core/tag';
import { useAppStore } from '@/features/app-context/store';
import { FormSection } from '@/shared/ui/form-section';
import { PageLayout } from '@/shared/ui/page-layout';

const managementActions = [
  { label: 'User Init', path: '/pages/user-init/index' },
  { label: 'Family Management', path: '/pages/family/index' },
  { label: 'Baby Management', path: '/pages/baby/index' },
  { label: 'Medical Records', path: '/pages/medical-record/index' },
];

export function ProfilePageView() {
  const currentUserId = useAppStore((state) => state.currentUserId);
  const currentFamilyId = useAppStore((state) => state.currentFamilyId);
  const currentBabyId = useAppStore((state) => state.currentBabyId);
  const hydrated = useAppStore((state) => state.hydrated);

  function navigate(path: string) {
    void Taro.navigateTo({ url: path });
  }

  return (
    <PageLayout
      title="Profile"
      description="Context management center for the current development user, family, baby, and linked CRUD pages."
      hydrated={hydrated}
    >
      <FormSection title="Current context">
        <View style={{ display: 'grid', gap: '10px' }}>
          <Tag color="primary" variant="contained">
            user: {hydrated ? currentUserId || 'not set' : 'loading...'}
          </Tag>
          <Tag color="success" variant="contained">
            family: {hydrated ? currentFamilyId || 'not set' : 'loading...'}
          </Tag>
          <Tag color="warning" variant="contained">
            baby: {hydrated ? currentBabyId || 'not set' : 'loading...'}
          </Tag>
        </View>
      </FormSection>

      <FormSection title="Management">
        <View style={{ display: 'grid', gap: '12px' }}>
          {managementActions.map((action) => (
            <Button
              key={action.path}
              block
              variant="outlined"
              color="primary"
              onClick={() => navigate(action.path)}
            >
              {action.label}
            </Button>
          ))}
        </View>
      </FormSection>

      <FormSection title="Project status">
        <Text
          style={{
            display: 'block',
            fontSize: '14px',
            lineHeight: '22px',
            color: '#6f6457',
          }}
        >
          We keep the new product-facing tab structure in place here while the actual backend-linked
          workflows still live in the dedicated user-init, family, baby, and medical-record pages.
        </Text>
      </FormSection>
    </PageLayout>
  );
}

export default ProfilePageView;
