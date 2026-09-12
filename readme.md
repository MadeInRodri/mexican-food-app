# Aplicación de React Native de comida mexicana

App móvil diseñada para gestionar órdenes en un restaurante de comida mexicana, desarrollada como parte del Segundo Desafío Práctico de Aplicaciones Multiplataforma.

## Instalación y Configuración Local

1.  **Clona el repositorio** en tu entorno local.
2.  **Instala las dependencias** ejecutando el siguiente comando:
    ```bash
    npm install
    ```
3.  **Inicia el entorno de desarrollo** limpiando la caché para asegurar que la configuración de NativeWind se cargue correctamente:
    ```bash
    npx expo start -c
    ```
    _(El proyecto puede visualizarse con un emulador de Android)._

## Funcionalidades Principales

- **Login y Sesión Local:** Autenticación simulada que verifica las credenciales guardadas en el almacenamiento del dispositivo.
- **Catálogo Separado:** 10 alimentos y 5 bebidas de comida mexicana con precios fijos.
- **Carrito Interactivo:** Permite elegir cantidades con validaciones numéricas estrictas.
- **Checkout y Simulación de IVA:** Pantalla de resumen de orden que calcula el subtotal, el IVA (13%) y el total final antes del cobro.
- **Historial de Compras Personalizado:** Visualización de las órdenes pagadas vinculadas exclusivamente al usuario activo, ordenadas desde la más reciente.

## Stack Tecnológico

- **React Native & Expo:** Desarrollo del proyecto base.
- **Expo Router:** Navegación (Tabs, Stacks y Modales).
- **NativeWind v5 (Tailwind CSS):** Estilización rápida de interfaces mediante clases de utilidad.
- **Zustand & AsyncStorage:** Estado global y almacenamiento persistente (historial, sesión y carrito) para rehidratación sin base de datos.
- **React Hook Form:** Control de inputs y advertencias en pantalla para las validaciones del Login/Registro.

## Video de Defensa

https://www.youtube.com/watch?v=2GFzP-rQMI0

---

_Desarrollado para el Segundo Desafío Práctico (DPS)_
