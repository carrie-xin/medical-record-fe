import { Baby } from '@/features/baby/types';

export interface MedicalRecord {
  id: string;
  babyId: string;
  baby: Baby;
  recordType: string;
  visitDate: string;
  hospitalName: string | null;
  departmentName: string | null;
  doctorName: string | null;
  chiefComplaint: string | null;
  diagnosis: string | null;
  treatment: string | null;
  medication: string | null;
  notes: string | null;
  attachments: unknown;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMedicalRecordPayload {
  babyId: string;
  recordType: string;
  visitDate: string;
  hospitalName?: string;
  departmentName?: string;
  doctorName?: string;
  chiefComplaint?: string;
  diagnosis?: string;
  treatment?: string;
  medication?: string;
  notes?: string;
}
