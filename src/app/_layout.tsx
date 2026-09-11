import "../../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { View, ActivityIndicator } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const isLogged = useAuthStore((state) => state.isLogged);
  const [isHydrated, setIsHydrated] = useState(false);

  //Veo que los datos ya estén cargados
  useEffect(() => {
    useAuthStore.persist.onFinishHydration(() => setIsHydrated(true));
    setIsHydrated(useAuthStore.persist.hasHydrated());
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    const inAuthGroup = segments[0] === "(auth)";

    //Si no hay sesión, lo mando al login
    if (!isLogged && !inAuthGroup) {
      router.replace("/(auth)/login" as any);
      //Si la hay, al menú
    } else if (isLogged && inAuthGroup) {
      router.replace("/(tabs)" as any);
    }
  }, [isLogged, segments, isHydrated]);

  //Pantalla de carga
  if (!isHydrated) {
    return (
      <View className="flex-1 items-center justify-center bg-orange-50">
        <ActivityIndicator size="large" color="#ea580c" />
      </View>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff7ed" },
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="checkout" options={{ presentation: "modal" }} />
    </Stack>
  );
}
