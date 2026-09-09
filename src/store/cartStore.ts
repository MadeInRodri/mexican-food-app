import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Alert } from "react-native";
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
    (set) => ({
      activeOrder: [],
      orderHistory: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.activeOrder.find((i) => i.id === item.id);

          if (existing) {
            if (existing.quantity >= 20) {
              Alert.alert(
                "Límite alcanzado",
                `No puedes llevar más de 20 unidades de ${item.title}. ¡Deja para los demás!`,
              );

              return state;
            }

            return {
              activeOrder: state.activeOrder.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
              ),
            };
          }
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
      removeItem: (id) =>
        set((state) => ({
          activeOrder: state.activeOrder.filter((i) => i.id !== id),
        })),
      checkout: () =>
        set((state) => {
          const total = state.activeOrder.reduce(
            (acc, i) => acc + i.price * i.quantity,
            0,
          );
          const newOrder: Order = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            items: state.activeOrder,
            total,
          };
          return {
            orderHistory: [newOrder, ...state.orderHistory],
            activeOrder: [],
          };
        }),
    }),
    { name: "food-app-cart", storage: createJSONStorage(() => AsyncStorage) },
  ),
);
