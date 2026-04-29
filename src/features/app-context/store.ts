import { create } from 'zustand';
import { storage } from '@/shared/utils/storage';

interface AppState {
  currentUserId: string | null;
  currentFamilyId: string | null;
  currentBabyId: string | null;
  hydrated: boolean;
  hydrateFromStorage: () => void;
  setCurrentUserId: (id: string | null) => void;
  setCurrentFamilyId: (id: string | null) => void;
  setCurrentBabyId: (id: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentUserId: null,
  currentFamilyId: null,
  currentBabyId: null,
  hydrated: false,
  hydrateFromStorage: () =>
    set({
      currentUserId: storage.getUserId(),
      currentFamilyId: storage.getFamilyId(),
      currentBabyId: storage.getBabyId(),
      hydrated: true,
    }),
  setCurrentUserId: (id) => {
    storage.setUserId(id);
    set({ currentUserId: id });
  },
  setCurrentFamilyId: (id) => {
    storage.setFamilyId(id);
    set({ currentFamilyId: id });
  },
  setCurrentBabyId: (id) => {
    storage.setBabyId(id);
    set({ currentBabyId: id });
  },
}));
