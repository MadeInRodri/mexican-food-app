import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import { useAuthStore } from "@/store/authStore";

export default function TabsLayout() {
  // Extraemos la acción de logout del store
  const logout = useAuthStore((state) => state.logout);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ea580c",
        tabBarInactiveTintColor: "#9ca3af",
        headerStyle: { backgroundColor: "#ea580c" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },
        headerRight: () => (
          <Pressable
            onPress={logout}
            className="mr-4 flex-row items-center active:opacity-70 bg-orange-600 px-3 py-1.5 rounded-full"
          >
            <Text className="text-white font-bold mr-1 text-sm">Salir</Text>
            <MaterialIcons name="logout" size={16} color="white" />
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Menú",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="restaurant-menu" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Mis Órdenes",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="receipt-long" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
