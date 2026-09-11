import React, { useState } from "react";
import { Alert } from "react-native";
import { View, Text, ScrollView, Pressable, Image, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCartStore } from "@/store/cartStore";
import productsData from "@/data/products.json";

export default function MenuScreen() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { activeOrder, addItem, decreaseItem, removeItem } = useCartStore();
  const router = useRouter();

  const total = activeOrder.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const groupedProducts = productsData.reduce(
    (acc, product) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push(product);
      return acc;
    },
    {} as Record<string, typeof productsData>,
  );

  return (
    <View className="flex-1 bg-orange-50">
      <ScrollView className="p-4 mb-10">
        {Object.entries(groupedProducts).map(([category, prods]) => (
          <View key={category} className="mb-8">
            <Text className="text-2xl font-extrabold text-gray-800 mb-4 border-b-2 border-orange-200 pb-2 self-start">
              {category}
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {prods.map((p) => (
                <View
                  key={p.id}
                  className="w-[48%] bg-white rounded-2xl mb-4 overflow-hidden shadow-sm border border-orange-100"
                >
                  <Image
                    source={{ uri: p.urlImage }}
                    className="w-full h-32 bg-gray-100"
                    resizeMode="cover"
                  />
                  <View className="p-3">
                    <Text className="font-bold text-gray-800" numberOfLines={1}>
                      {p.title}
                    </Text>
                    <Text
                      className="text-xs text-gray-500 mb-2"
                      numberOfLines={2}
                    >
                      {p.description}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="font-bold text-orange-600">
                        ${p.price.toFixed(2)}
                      </Text>
                      <Pressable
                        onPress={() =>
                          addItem({
                            id: p.id,
                            title: p.title,
                            price: p.price,
                            urlImage: p.urlImage,
                            quantity: 1,
                          })
                        }
                        className="bg-orange-500 rounded-full p-2 active:bg-orange-600"
                      >
                        <MaterialIcons
                          name="add-shopping-cart"
                          size={16}
                          color="white"
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Botón Flotante del Carrito */}
      {activeOrder.length > 0 && (
        <Pressable
          onPress={() => setIsCartOpen(true)}
          className="absolute bottom-6 right-6 bg-green-500 rounded-full p-4 shadow-lg flex-row items-center active:bg-green-600"
        >
          <MaterialIcons name="shopping-cart" size={24} color="white" />
          <Text className="text-white font-bold ml-2">${total.toFixed(2)}</Text>
        </Pressable>
      )}

      {/* Modal del Carrito */}
      <Modal visible={isCartOpen} animationType="slide" transparent={true}>
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl h-3/4 flex-col">
            <View className="flex-row justify-between items-center p-6 border-b border-gray-100">
              <Text className="text-2xl font-bold text-gray-800">Tu Orden</Text>
              <Pressable onPress={() => setIsCartOpen(false)}>
                <MaterialIcons name="close" size={24} color="#9ca3af" />
              </Pressable>
            </View>

            <ScrollView className="p-6">
              {activeOrder.map((item) => (
                <View
                  key={item.id}
                  className="flex-row items-center justify-between mb-4 bg-gray-50 p-3 rounded-xl"
                >
                  <View className="flex-1">
                    <Text className="font-bold text-gray-800">
                      {item.title}
                    </Text>
                    <Text className="text-orange-600 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Text>
                  </View>
                  <View className="flex-row items-center bg-white border border-gray-200 rounded-lg">
                    <Pressable
                      onPress={() => decreaseItem(item.id)}
                      className="p-2"
                    >
                      <MaterialIcons name="remove" size={16} />
                    </Pressable>
                    <Text className="px-2 font-bold">{item.quantity}</Text>
                    <Pressable onPress={() => addItem(item)} className="p-2">
                      <MaterialIcons name="add" size={16} />
                    </Pressable>
                  </View>
                  <Pressable
                    onPress={() => removeItem(item.id)}
                    className="ml-4 p-2"
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={20}
                      color="#ef4444"
                    />
                  </Pressable>
                </View>
              ))}
            </ScrollView>

            <View className="p-6 border-t border-gray-100 bg-white">
              <View className="flex-row justify-between mb-4">
                <Text className="text-gray-500 font-bold uppercase">Total</Text>
                <Text className="text-2xl font-bold text-orange-600">
                  ${total.toFixed(2)}
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  Alert.alert(
                    "Confirmar Orden",
                    `¿Confirmar orden por $${total.toFixed(2)}?`,
                    [
                      {
                        text: "Cancelar",
                        style: "cancel",
                      },
                      {
                        text: "Sí, confirmar",
                        onPress: () => {
                          const isValid = useCartStore.getState().checkout();

                          if (isValid as any) {
                            setIsCartOpen(false);
                            router.push("/checkout" as any);
                          }
                        },
                      },
                    ],
                  );
                }}
                className="w-full bg-green-500 active:bg-green-600 rounded-xl py-4 items-center justify-center"
              >
                <Text className="text-white font-bold text-lg">Ir a pagar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
