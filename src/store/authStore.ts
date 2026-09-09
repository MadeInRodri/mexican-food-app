import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Usuario {
  nombre: string;
  email: string;
}

interface AuthState {
  isLogged: boolean;
  user?: Usuario;
  login: (user: Usuario) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLogged: false,
      login: (user: Usuario) => set({ isLogged: true, user }),
      logout: () => set({ isLogged: false, user: undefined }),
    }),
    {
      name: "food-app-session",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
