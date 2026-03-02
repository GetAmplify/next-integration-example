# Ejemplo de Integración con Next.js

Este proyecto es un ejemplo de integración utilizando Next.js, Tailwind CSS y PNPM. Incluye una funcionalidad básica para crear una intención de pago, así como una página de éxito después de completar el pago.

## Requisitos

- Node.js >= 18
- PNPM

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```
2. Instala las dependencias:
   ```bash
   pnpm install
   ```

## Uso

1. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```
2. Abre tu navegador y visita `http://localhost:3000`.

## Variables de entorno necesarias (`.env`)

Asegúrate de crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
AMPLIFY_API_KEY=tu_api_key_de_amplify
AMPLIFY_CLIENT_ID=tu_client_id_de_amplify
AMPLIFY_API_URL=https://api.getamplify.app
SUCCESS_URL=http://localhost:3000/success
```

- `AMPLIFY_API_KEY`: API Key proporcionada por Amplify.
- `AMPLIFY_CLIENT_ID`: Client ID proporcionado por Amplify.
- `AMPLIFY_API_URL`: URL base de la API de Amplify.
- `SUCCESS_URL`: URL de redirección tras el pago exitoso.

## Estructura del Proyecto

- `api/create-payment-intent/route.ts`: Endpoint para crear una intención de pago.
- `success/page.tsx`: Página de éxito después de un pago.

## Endpoints

- `POST /api/create-payment-intent`: Crea una intención de pago. Requiere los siguientes datos en el cuerpo:
  - `amount`: Monto del pago (opcional).
  - `metadata`: Metadatos adicionales del producto.
  - `merchantData`: Información del comercio (nombre, descripción, logo).
