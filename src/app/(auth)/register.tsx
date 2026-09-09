import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { router, Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useAuthStore } from "@/store/authStore";

type FormData = {
  username: string;
  email: string;
  password: string;
};

export default function RegisterScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { username: "", email: "", password: "" },
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Extraemos la acción de registro del store
  const registerAction = useAuthStore((state) => state.register);

  const onSubmit = (data: FormData) => {
    const success = registerAction({
      nombre: data.username,
      email: data.email,
      password: data.password,
    });

    if (success) {
      reset();
      router.replace("/(auth)/login" as any);
    } else {
      Alert.alert("Error", "Este correo electrónico ya está registrado.");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-orange-50 p-4">
      <View className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-sm border border-orange-100">
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-orange-100 rounded-2xl items-center justify-center mb-4 border border-orange-200">
            <MaterialIcons name="person-add" size={32} color="#ea580c" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
            Únete a la familia
          </Text>
          <Text className="text-gray-500 text-center">
            Pide en segundos y sin filas.
          </Text>
        </View>

        <View className="gap-4">
          <View>
            <Text className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
              Nombre
            </Text>
            <Controller
              control={control}
              name="username"
              rules={{
                required: "Requerido",
                minLength: { value: 3, message: "Mínimo 3 caracteres" },
              }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-3 py-3 ${errors.username ? "border-red-500" : focusedInput === "username" ? "border-orange-500" : "border-gray-200"}`}
                >
                  <MaterialIcons
                    name="person-outline"
                    size={20}
                    color={errors.username ? "#ef4444" : "#9ca3af"}
                    className="mr-2"
                  />
                  <TextInput
                    className="flex-1 text-gray-800 ml-2"
                    placeholder="Tu nombre"
                    placeholderTextColor="#9ca3af"
                    autoCapitalize="words"
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => setFocusedInput("username")}
                    onBlur={() => setFocusedInput(null)}
                  />
                </View>
              )}
            />
            {errors.username && (
              <Text className="text-red-500 text-xs mt-1 ml-1">
                {errors.username.message}
              </Text>
            )}
          </View>

          <View>
            <Text className="text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">
              Correo
            </Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Correo inválido",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-3 py-3 ${errors.email ? "border-red-500" : focusedInput === "email" ? "border-orange-500" : "border-gray-200"}`}
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
                required: "Requerida",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              }}
              render={({ field: { onChange, value } }) => (
                <View
                  className={`flex-row items-center bg-gray-50 border rounded-xl px-3 py-3 ${errors.password ? "border-red-500" : focusedInput === "password" ? "border-orange-500" : "border-gray-200"}`}
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
            className="w-full mt-4 bg-green-500 active:bg-green-600 rounded-xl py-4 flex-row items-center justify-center shadow-sm"
          >
            <Text className="text-white font-bold mr-2 text-base">
              Crear cuenta y pedir
            </Text>
            <MaterialIcons name="fastfood" size={18} color="white" />
          </Pressable>
        </View>

        <View className="mt-8 items-center">
          <Link href="/(auth)/login" asChild>
            <Pressable>
              <Text className="text-orange-500 font-bold">
                ¿Ya tienes cuenta? Inicia sesión.
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}
