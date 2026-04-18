import { create } from 'zustand';
import type { User } from '@/types';
import * as api from './api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    cpfCnpj: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<boolean>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
  clearError: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const result = await api.login(email, password);
      if (result.success && result.data) {
        const user = result.data.user as User;
        set({ user, isAuthenticated: true, isLoading: false });
        await api.saveUserData(user);
        return true;
      }
      set({
        error: result.error || 'Credenciais inválidas',
        isLoading: false,
      });
      return false;
    } catch {
      set({ error: 'Erro ao conectar. Tente novamente.', isLoading: false });
      return false;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const result = await api.register(data);
      if (result.success && result.data) {
        const user = result.data.user as User;
        set({ user, isAuthenticated: true, isLoading: false });
        await api.saveUserData(user);
        return true;
      }
      set({
        error: result.error || 'Erro ao criar conta',
        isLoading: false,
      });
      return false;
    } catch {
      set({ error: 'Erro ao conectar. Tente novamente.', isLoading: false });
      return false;
    }
  },

  logout: async () => {
    try {
      await api.logout();
    } catch {
      // ignore
    }
    await api.clearToken();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  checkSession: async () => {
    set({ isLoading: true });
    try {
      const token = await api.loadToken();
      if (!token) {
        set({ isLoading: false, isAuthenticated: false });
        return false;
      }
      const result = await api.getSession();
      if (result.success && result.data) {
        const user = result.data.user as User;
        set({ user, isAuthenticated: true, isLoading: false });
        return true;
      }
      await api.clearToken();
      set({ isLoading: false, isAuthenticated: false });
      return false;
    } catch {
      await api.clearToken();
      set({ isLoading: false, isAuthenticated: false });
      return false;
    }
  },

  clearError: () => set({ error: null }),
}));
