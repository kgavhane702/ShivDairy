import { create } from 'zustand';
import type { User } from '../domain/types';

type AuthState = {
  user: User | null;
  signIn: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  signIn: (email) =>
    set({
      user: {
        name: 'Aarav Sharma',
        email,
        phone: '+91 98765 43210',
      },
    }),
  register: (name, email) =>
    set({
      user: {
        name,
        email,
        phone: '+91 98765 43210',
      },
    }),
  signOut: () => set({ user: null }),
}));
