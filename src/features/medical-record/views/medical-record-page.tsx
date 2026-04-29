import Taro from '@tarojs/taro';
import Button from '@taroify/core/button';
import Field from '@taroify/core/field';
import Input from '@taroify/core/input';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useAppStore } from '@/features/app-context/store';
import {
  createMedicalRecord,
  getMedicalRecords,
} from '@/features/medical-record/api';
import { MedicalRecord } from '@/features/medical-record/types';
import { useZodForm } from '@/shared/forms/use-zod-form';
import { FormSection } from '@/shared/ui/form-section';
import { PageLayout } from '@/shared/ui/page-layout';
import { RecordList } from '@/shared/ui/record-list';

const medicalRecordSchema = z.object({
  hospitalName: z.string().trim().min(2, 'Hospital name is required'),
  doctorName: z.string().trim().min(2, 'Doctor name is required'),
  chiefComplaint: z.string().trim().min(2, 'Chief complaint is required'),
});

export function MedicalRecordPageView() {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const babyId = useAppStore((state) => state.currentBabyId);
  const hydrated = useAppStore((state) => state.hydrated);
  const form = useZodForm(medicalRecordSchema, {
    hospitalName: 'Children Hospital',
    doctorName: 'Dr. Li',
    chiefComplaint: 'Fever',
  });

  async function loadRecords() {
    if (!babyId) {
      setRecords([]);
      return;
    }

    try {
      const data = await getMedicalRecords(babyId);
      setRecords(data);
    } catch {
      Taro.showToast({ title: 'Load failed', icon: 'none' });
    }
  }

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    void loadRecords();
  }, [babyId, hydrated]);

  async function handleCreateRecord() {
    if (!babyId) {
      Taro.showToast({ title: 'Select baby first', icon: 'none' });
      return;
    }

    await form.submit(async (values) => {
      await createMedicalRecord({
        babyId,
        recordType: 'OUTPATIENT',
        visitDate: new Date().toISOString(),
        hospitalName: values.hospitalName,
        doctorName: values.doctorName,
        chiefComplaint: values.chiefComplaint,
      });

      await loadRecords();
      Taro.showToast({ title: 'Created', icon: 'success' });
    });
  }

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
      title="Medical Record"
      description="Create a record for the active baby and review the recent medical history list."
      contextLabel="Current babyId"
      contextValue={babyId}
      hydrated={hydrated}
    >
      <FormSection title="Create record">
        <Field label="Hospital" feedback={form.errors.hospitalName}>
          <Input
            value={form.values.hospitalName}
            placeholder="Hospital"
            clearable
            onChange={(event) => form.setFieldValue('hospitalName', event.detail.value)}
          />
        </Field>
        <Field label="Doctor" feedback={form.errors.doctorName}>
          <Input
            value={form.values.doctorName}
            placeholder="Doctor"
            clearable
            onChange={(event) => form.setFieldValue('doctorName', event.detail.value)}
          />
        </Field>
        <Field label="Chief complaint" feedback={form.errors.chiefComplaint}>
          <Input
            value={form.values.chiefComplaint}
            placeholder="Chief complaint"
            clearable
            onChange={(event) => form.setFieldValue('chiefComplaint', event.detail.value)}
          />
        </Field>
        <Button
          block
          color="primary"
          loading={form.submitting}
          style={{ marginTop: '12px' }}
          onClick={handleCreateRecord}
        >
          Create Record
        </Button>
      </FormSection>

      <FormSection title="Record history">
        <RecordList items={recordItems} emptyText="No medical records yet." />
      </FormSection>
    </PageLayout>
  );
}

export default MedicalRecordPageView;
