export const BABY_GENDERS = ['MALE', 'FEMALE', 'UNKNOWN'] as const;

export type BabyGender = (typeof BABY_GENDERS)[number];

export interface BabyFamily {
  id: string;
  name: string;
}

export interface Baby {
  id: string;
  familyId: string | null;
  family: BabyFamily | null;
  name: string;
  nickname: string | null;
  gender: BabyGender;
  birthday: string;
  photoKey: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBabyPayload {
  familyId?: string;
  name: string;
  nickname?: string;
  gender: BabyGender;
  birthday: string;
  photoKey?: string;
}
