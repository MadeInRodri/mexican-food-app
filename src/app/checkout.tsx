import React from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutScreen() {
  const { orderId } = useLocalSearchParams();
  const router = useRouter();
  const orderHistory = useCartStore((state) => state.orderHistory);

  const currentOrder = orderId
    ? orderHistory.find((o) => o.id === orderId)
    : orderHistory[0];

  if (!currentOrder) {
    return (
      <View className="flex-1 items-center justify-center bg-orange-50">
        <Text className="text-gray-500 font-bold text-lg">
          Orden no encontrada.
        </Text>
      </View>
    );
  }

  const subtotal = currentOrder.total;
  const iva = subtotal * 0.13;
  const finalTotal = subtotal + iva;

  const handlePayment = () => {
    Alert.alert(
      "¡Pago Exitoso!",
      "Tu orden se está preparando en la cocina. ¡Gracias por tu compra!",
      [
        {
          text: "Volver al Menú",
          onPress: () => router.replace("/(tabs)" as any),
        },
      ],
    );
  };

  return (
    <View className="flex-1 bg-orange-50 pt-10">
      <View className="flex-row items-center justify-between px-6 pb-4 border-b border-orange-200">
        <Text className="text-3xl font-extrabold text-gray-800">Tu Recibo</Text>
        <Pressable
          onPress={() => router.back()}
          className="bg-white p-2 rounded-full shadow-sm"
        >
          <MaterialIcons name="close" size={24} color="#9ca3af" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-4 py-6">
        <View className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100 mb-6">
          <Text className="text-sm text-gray-400 font-bold mb-4 uppercase tracking-widest">
            Detalle de productos
          </Text>

          {currentOrder.items.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center mb-4 border-b border-gray-50 pb-4"
            >
              <View className="flex-1 pr-2">
                <Text className="font-bold text-gray-800 text-base">
                  {item.title}
                </Text>
                <Text className="text-gray-500 text-sm">
                  {item.quantity}x ${item.price.toFixed(2)}
                </Text>
              </View>
              <Text className="font-bold text-orange-600 text-base">
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        <View className="bg-white rounded-3xl p-6 shadow-sm border border-orange-100">
          <Text className="text-sm text-gray-400 font-bold mb-4 uppercase tracking-widest">
            Resumen de pago
          </Text>

          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-gray-500 font-medium">Subtotal</Text>
              <Text className="text-gray-800 font-bold">
                ${subtotal.toFixed(2)}
              </Text>
            </View>
            <View className="flex-row justify-between mt-2">
              <Text className="text-gray-500 font-medium">IVA (13%)</Text>
              <Text className="text-gray-800 font-bold">${iva.toFixed(2)}</Text>
            </View>
            <View className="border-t border-dashed border-gray-200 my-4" />
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 font-extrabold text-lg uppercase">
                Total Final
              </Text>
              <Text className="text-orange-600 font-extrabold text-2xl">
                ${finalTotal.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="p-6 bg-white border-t border-orange-100">
        <Pressable
          onPress={handlePayment}
          className="w-full bg-green-500 active:bg-green-600 rounded-xl py-4 flex-row items-center justify-center shadow-sm"
        >
          <MaterialIcons
            name="payment"
            size={20}
            color="white"
            className="mr-2"
          />
          <Text className="text-white font-bold text-lg ml-2">
            Simular Pago
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
