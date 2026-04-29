import Taro from '@tarojs/taro';
import { Text, View } from '@tarojs/components';
import Button from '@taroify/core/button';
import Tag from '@taroify/core/tag';
import { useEffect, useMemo, useState } from 'react';
import { useAppStore } from '@/features/app-context/store';
import { getMedicalRecords } from '@/features/medical-record/api';
import { MedicalRecord } from '@/features/medical-record/types';
import { FormSection } from '@/shared/ui/form-section';
import { PageLayout } from '@/shared/ui/page-layout';
import { RecordList } from '@/shared/ui/record-list';

const symptomTags = ['Cough', 'Fever', 'Rash', 'Allergy'];

export function HealthPageView() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const currentBabyId = useAppStore((state) => state.currentBabyId);
  const hydrated = useAppStore((state) => state.hydrated);

  useEffect(() => {
    async function loadRecords() {
      if (!currentBabyId) {
        setRecords([]);
        return;
      }

      try {
        const data = await getMedicalRecords(currentBabyId);
        setRecords(data);
      } catch {
        Taro.showToast({ title: 'Load failed', icon: 'none' });
      }
    }

    if (!hydrated) {
      return;
    }

    void loadRecords();
  }, [currentBabyId, hydrated]);

  const recordItems = useMemo(
    () =>
      records.map((record) => ({
        id: record.id,
        title: record.hospitalName || 'No hospital',
        description: record.chiefComplaint || 'No complaint',
      })),
    [records],
  );

  return (
    <PageLayout
      title="Health"
      description="Focus on the current baby, recent medical history, and shortcuts into the record flow."
      contextLabel="Current babyId"
      contextValue={currentBabyId}
      hydrated={hydrated}
    >
      <FormSection title="Search direction">
        <View style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {symptomTags.map((tag) => (
            <Tag key={tag} color="primary" variant="outlined">
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
          Symptom search is not connected yet. This tab keeps the health-centered IA in place while
          reusing the current medical-record module underneath.
        </Text>
      </FormSection>

      <FormSection title="Record actions">
        <View style={{ display: 'grid', gap: '12px' }}>
          <Button
            block
            color="primary"
            onClick={() => void Taro.navigateTo({ url: '/pages/medical-record/index' })}
          >
            Add Medical Record
          </Button>
          <Button
            block
            variant="outlined"
            color="primary"
            onClick={() => void Taro.navigateTo({ url: '/pages/baby/index' })}
          >
            Switch Baby Context
          </Button>
        </View>
      </FormSection>

      <FormSection title="Recent records">
        <RecordList items={recordItems} emptyText="No medical records for the active baby yet." />
      </FormSection>
    </PageLayout>
  );
}

export default HealthPageView;
