import React, { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";

type FormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { email: "", password: "" },
  });

  const login = useAuthStore((state) => state.login);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const onSubmit = (data: FormData) => {
    console.log("¡Datos capturados con éxito!", data);
    reset();
    // TODO: Validar credenciales locales según el desafío
    login({ nombre: "Cliente", email: data.email });
  };

  return (
    <View className="flex-1 items-center justify-center bg-orange-50 p-4">
      <View className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-orange-100">
        <View className="items-center mb-8">
          <View className="w-16 h-16 bg-orange-100 rounded-2xl items-center justify-center mb-4 border border-orange-200">
            <MaterialIcons name="restaurant" size={32} color="#ea580c" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
            ¡Qué bueno verte!
          </Text>
          <Text className="text-gray-500 text-center font-medium">
            Tus tacos favoritos te esperan.
          </Text>
        </View>

        <View className="gap-4">
          <View>
            <Text className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
              Correo electrónico
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ingresa un correo válido",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-3 py-3 ${
                    errors.email
                      ? "border-red-500"
                      : focusedInput === "email"
                        ? "border-orange-500"
                        : "border-gray-200"
                  }`}
                >
                  <MaterialIcons
                    name="mail-outline"
                    size={20}
                    color={errors.email ? "#ef4444" : "#9ca3af"}
                    className="mr-2"
                  />
                  <TextInput
                    className="flex-1 text-gray-800 ml-2"
                    placeholder="correo@ejemplo.com"
                    placeholderTextColor="#9ca3af"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => setFocusedInput("email")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {errors.email.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
              Contraseña
            </Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: "Debe tener al menos 6 caracteres",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-3 py-3 ${
                    errors.password
                      ? "border-red-500"
                      : focusedInput === "password"
                        ? "border-orange-500"
                        : "border-gray-200"
                  }`}
                >
                  <MaterialIcons
                    name="lock-outline"
                    size={20}
                    color={errors.password ? "#ef4444" : "#9ca3af"}
                    className="mr-2"
                  />
                  <TextInput
                    className="flex-1 text-gray-800 ml-2"
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => setFocusedInput("password")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {errors.password.message}
              </Text>
            )}
          </View>

          <Pressable
            onPress={handleSubmit(onSubmit)}
            className="w-full mt-4 bg-orange-500 active:bg-orange-600 rounded-xl py-4 items-center justify-center shadow-sm"
          >
            <Text className="text-white font-bold text-base">Entrar</Text>
          </Pressable>
        </View>

        <View className="mt-8 items-center">
          <Link href="/(auth)/register" asChild>
            <Pressable>
              <Text className="text-orange-500 font-bold">
                ¿Hambre? Crea tu cuenta aquí.
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
