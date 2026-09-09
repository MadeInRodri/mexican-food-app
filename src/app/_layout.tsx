import "../../global.css";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const isLogged = useAuthStore((state) => state.isLogged);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 100);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const inAuthGroup = segments[0] === "(auth)";

    if (!isLogged && !inAuthGroup) {
      router.replace("/(auth)/login" as any);
    } else if (isLogged && inAuthGroup) {
      router.replace("/(tabs)" as any);
    }
  }, [isLogged, segments, isReady]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff7ed" }, // bg-orange-50
      }}
    >
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
