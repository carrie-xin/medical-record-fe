import Taro from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import Button from '@taroify/core/button';
import Cell from '@taroify/core/cell';
import Tag from '@taroify/core/tag';
import { useAppStore } from '@/features/app-context/store';
import { FormSection } from '@/shared/ui/form-section';
import { PageLayout } from '@/shared/ui/page-layout';

const reminderGroups = [
  {
    title: 'Today',
    items: [
      {
        id: 'medicine',
        title: 'Ibuprofen dose reminder',
        description: '2:00 PM · after meal · 5ml',
        primaryAction: 'Go Handle',
      },
      {
        id: 'follow-up',
        title: 'Pediatric follow-up',
        description: 'Beijing Children Hospital · Friday 09:30',
        primaryAction: 'Go Record',
      },
    ],
  },
  {
    title: 'This Week',
    items: [
      {
        id: 'vaccine',
        title: 'Hepatitis B vaccine (dose 3)',
        description: 'May 28 · vaccination reminder',
        primaryAction: 'View Details',
      },
      {
        id: 'checkup',
        title: '18-month child health check',
        description: 'Friday 09:30 · child care reminder',
        primaryAction: 'View Details',
      },
    ],
  },
];

export function ReminderPageView() {
  const currentBabyId = useAppStore((state) => state.currentBabyId);
  const hydrated = useAppStore((state) => state.hydrated);

  function goToMedicalRecord() {
    void Taro.navigateTo({ url: '/pages/medical-record/index' });
  }

  return (
    <PageLayout
      title="Reminder"
      description="Task-focused reminders for the active baby, including medication, child care, vaccine, and follow-up prompts."
      contextLabel="Current babyId"
      contextValue={currentBabyId}
      hydrated={hydrated}
    >
      <FormSection title="Reminder categories">
        <View style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Medicine', 'Child Care', 'Vaccine', 'Follow-up'].map((tag) => (
            <Tag key={tag} color="warning" variant="contained">
              {tag}
            </Tag>
          ))}
        </View>
        <Text
          style={{
            display: 'block',
            marginTop: '12px',
            fontSize: '14px',
            lineHeight: '22px',
            color: '#6f6457',
          }}
        >
          This page is a UI-first reminder center. The current project does not have reminder APIs
          yet, so the data here is structured placeholder content.
        </Text>
      </FormSection>

      {reminderGroups.map((group) => (
        <FormSection key={group.title} title={group.title}>
          <View style={{ borderRadius: '16px', overflow: 'hidden', backgroundColor: '#fffaf3' }}>
            {group.items.map((item) => (
              <View key={item.id} style={{ borderBottom: '1px solid #f0e6d7' }}>
                <Cell title={item.title} brief={item.description} />
                <View style={{ padding: '0 16px 16px', display: 'flex', gap: '10px' }}>
                  <Button size="small" color="primary" onClick={goToMedicalRecord}>
                    {item.primaryAction}
                  </Button>
                  <Button size="small" variant="outlined" color="primary">
                    Delay 30m
                  </Button>
                </View>
              </View>
            ))}
          </View>
        </FormSection>
      ))}
    </PageLayout>
  );
}

export default ReminderPageView;
