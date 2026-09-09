import React from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cartStore";

export default function HistoryScreen() {
  const orderHistory = useCartStore((state) => state.orderHistory);
  const router = useRouter();

  return (
    <View className="flex-1 bg-orange-50 p-4">
      <Text className="text-3xl font-extrabold text-gray-800 mb-6 border-b-2 border-orange-200 pb-2 self-start">
        Historial de Compras
      </Text>

      {orderHistory.length === 0 ? (
        <View className="flex-1 items-center justify-center">
          <MaterialIcons
            name="receipt-long"
            size={64}
            color="#fdba74"
            className="mb-4"
          />
          <Text className="text-gray-500 text-lg font-medium text-center">
            Aún no tienes órdenes registradas.
          </Text>
          <Text className="text-gray-400 text-center mt-2">
            ¡Tus próximos tacos aparecerán aquí!
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
          {orderHistory.map((order) => {
            const date = new Date(order.date).toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            const finalTotal = order.total + order.total * 0.13;

            return (
              <Pressable
                key={order.id}
                onPress={() =>
                  router.push({
                    pathname: "/checkout",
                    params: { orderId: order.id },
                  })
                }
                className="bg-white p-5 rounded-3xl mb-4 border border-orange-100 shadow-sm flex-row items-center justify-between active:bg-orange-50"
              >
                <View className="flex-1 pr-4">
                  <View className="flex-row items-center mb-2">
                    <MaterialIcons
                      name="local-dining"
                      size={16}
                      color="#ea580c"
                      className="mr-2"
                    />
                    <Text className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      Orden #{order.id.slice(-5)}
                    </Text>
                  </View>

                  <Text className="text-gray-800 font-extrabold text-xl mb-1">
                    ${finalTotal.toFixed(2)}
                  </Text>

                  <Text
                    className="text-gray-500 text-sm mb-2"
                    numberOfLines={1}
                  >
                    {order.items
                      .map((i) => `${i.quantity}x ${i.title}`)
                      .join(", ")}
                  </Text>

                  <Text className="text-gray-400 text-xs font-medium">
                    {date}
                  </Text>
                </View>

                <View className="bg-orange-100 p-3 rounded-2xl">
                  <MaterialIcons name="visibility" size={24} color="#ea580c" />
                </View>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
