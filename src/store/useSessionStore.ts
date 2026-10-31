import { IUserModel } from 'auth/core/_models';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SessionState {
  token: string | null;
  user: IUserModel | null;
  setSession: (token: string, user: IUserModel) => void;
  updateUser: (changes: Partial<IUserModel>) => void;
  logout: () => void;
}

// localStorage is read synchronously on store creation, so no splash screen is needed on reload.
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      updateUser: (changes) => set((s) => (s.user ? { user: { ...s.user, ...changes } } : s)),
      logout: () => set({ token: null, user: null }),
    }),
    { name: import.meta.env.VITE_AUTH_LOCAL_STORAGE_KEY || 'AUTH_TOKEN' }
  )
);
