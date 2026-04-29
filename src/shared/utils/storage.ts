import Taro from '@tarojs/taro';
import { STORAGE_KEYS } from '@/shared/config/app';

function getValue(key: string) {
  return Taro.getStorageSync<string>(key) || null;
}

function setValue(key: string, value: string | null) {
  if (value) {
    Taro.setStorageSync(key, value);
    return;
  }

  Taro.removeStorageSync(key);
}

export const storage = {
  getUserId: () => getValue(STORAGE_KEYS.userId),
  setUserId: (id: string | null) => setValue(STORAGE_KEYS.userId, id),
  clearUserId: () => setValue(STORAGE_KEYS.userId, null),
  getFamilyId: () => getValue(STORAGE_KEYS.familyId),
  setFamilyId: (id: string | null) => setValue(STORAGE_KEYS.familyId, id),
  clearFamilyId: () => setValue(STORAGE_KEYS.familyId, null),
  getBabyId: () => getValue(STORAGE_KEYS.babyId),
  setBabyId: (id: string | null) => setValue(STORAGE_KEYS.babyId, id),
  clearBabyId: () => setValue(STORAGE_KEYS.babyId, null),
};
