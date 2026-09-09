import { Text, View, Pressable } from "react-native";
import { Link } from "expo-router";

export default function TestAuthScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-orange-100 p-4">
      <View className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-lg">
        <Text className="mb-2 text-center text-3xl font-extrabold text-orange-600">
          ¡Taquería Lista!
        </Text>
        <Text className="mb-8 text-center text-base text-gray-500">
          NativeWind está funcionando a la perfección.
        </Text>

        <Link href="/" asChild>
          <Pressable className="rounded-xl bg-orange-500 py-4 active:bg-orange-600">
            <Text className="text-center font-bold text-white text-lg">
              Empezar Login
            </Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
