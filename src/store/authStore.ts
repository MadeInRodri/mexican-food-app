import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Usuario {
  nombre: string;
  email: string;
  password?: string;
}

interface AuthState {
  isLogged: boolean;
  user?: Usuario;
  registeredUsers: Usuario[];
  login: (email: string, password: string) => boolean;
  register: (user: Usuario) => boolean;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLogged: false,
      registeredUsers: [],

      login: (email, password) => {
        const { registeredUsers } = get();
        const userMatch = registeredUsers.find(
          (u) => u.email === email && u.password === password,
        );

        if (userMatch) {
          set({
            isLogged: true,
            user: { nombre: userMatch.nombre, email: userMatch.email },
          });
          return true;
        }
        return false;
      },

      register: (user) => {
        const { registeredUsers } = get();
        const exists = registeredUsers.some((u) => u.email === user.email);
        if (exists) return false;

        set({ registeredUsers: [...registeredUsers, user] });
        return true;
      },

      logout: () => set({ isLogged: false, user: undefined }),
    }),
    {
      name: "food-app-session",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
