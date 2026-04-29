export interface FamilyOwner {
  id: string;
  nickname: string | null;
  avatarUrl: string | null;
}

export interface FamilyMemberSummary {
  id: string;
  familyId: string;
  userId: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Family {
  id: string;
  name: string;
  ownerUserId: string;
  owner: FamilyOwner;
  members: FamilyMemberSummary[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateFamilyPayload {
  name: string;
}
