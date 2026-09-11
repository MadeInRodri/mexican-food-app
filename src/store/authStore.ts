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

//Creamos el el objeto de Zustand
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLogged: false,
      registeredUsers: [],

      //Login
      login: (email, password) => {
        //Obtengo usuarios
        const { registeredUsers } = get();

        //Veo si existe el correo
        const userMatch = registeredUsers.find(
          (u) => u.email === email && u.password === password,
        );

        //Si existe
        if (userMatch) {
          set({
            //Guardo que estoy logeado
            isLogged: true,
            user: { nombre: userMatch.nombre, email: userMatch.email },
          });
          return true;
        }
        return false;
      },

      //Registro
      register: (user) => {
        //Obtengo usuarios registrados
        const { registeredUsers } = get();

        //Reviso si existe
        const exists = registeredUsers.some((u) => u.email === user.email);

        //Si existe, mando falso
        if (exists) return false;

        //Si no, registro el nuevo usuario
        set({ registeredUsers: [...registeredUsers, user] });
        return true;
      },

      //Para desloguearse solo pongo en falso el isLogged y borro el usuario
      logout: () => set({ isLogged: false, user: undefined }),
    }),
    {
      //Guardando en AsyncStorage
      name: "food-app-session",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
