export interface User {
  id: string;
  wechatOpenId: string | null;
  nickname: string | null;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserPayload {
  nickname?: string;
  avatarUrl?: string;
  wechatOpenId?: string;
}
