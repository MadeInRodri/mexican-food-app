import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Alert } from "react-native";
import { useAuthStore } from "./authStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface CartItem {
  id: number;
  title: string;
  price: number;
  urlImage: string;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  userEmail: string;
}

interface CartState {
  activeOrder: CartItem[];
  orderHistory: Order[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  checkout: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      //Tengo mi orden activa
      activeOrder: [],

      //Y mi historial
      orderHistory: [],

      //Agregando un item
      addItem: (item) =>
        set((state) => {
          //Veo si existe
          const existing = state.activeOrder.find((i) => i.id === item.id);

          //Si existe y ha pasado los 20, mando alerta
          if (existing) {
            if (existing.quantity >= 20) {
              Alert.alert(
                "Límite alcanzado",
                `No puedes llevar más de 20 unidades de ${item.title}. ¡Deja para los demás!`,
              );

              return state;
            }

            //Sino, sumamos 1
            return {
              activeOrder: state.activeOrder.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }

          //Si no existe lo agrego a la orden activa
          return {
            activeOrder: [...state.activeOrder, { ...item, quantity: 1 }],
          };
        }),
      decreaseItem: (id) =>
        set((state) => ({
          activeOrder: state.activeOrder.map((i) =>
            i.id === id && i.quantity > 1
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          ),
        })),

      //Remover
      removeItem: (id) =>
        set((state) => ({
          //Solo filtro la orden para que devuelva todos menos el seleccionado
          activeOrder: state.activeOrder.filter((i) => i.id !== id),
        })),

      //Pasar a la pantalla de pago
      checkout: () => {
        const state = get();

        //Obtengo el usuario
        const currentUser = useAuthStore.getState().user;

        //Calculo el total
        const total = state.activeOrder.reduce(
          (acc, i) => acc + i.price * i.quantity,
          0,
        );

        //No dejo pasar ordenes vacías
        if (total <= 0 || state.activeOrder.length === 0) {
          Alert.alert(
            "Orden Vacía",
            "Debe elegir al menos un producto para poder completar su orden.",
          );
          return false;
        }

        //Si no hay usuario, no pasa la orden
        if (!currentUser) return false;

        //Creo la orden
        const newOrder: Order = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          items: state.activeOrder,
          total,
          userEmail: currentUser.email,
        };

        //La agrego al historial
        set({
          orderHistory: [newOrder, ...state.orderHistory],
          activeOrder: [],
        });

        return true;
      },
    }),
    //Guardo en el asyncStorage
    { name: "food-app-cart", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
