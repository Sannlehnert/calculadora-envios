# 🛵 RutaBase

> Calculadora inteligente de envíos para revendedores

**RutaBase** es una herramienta web pensada para que vendedores independientes, revendedores y pequeños comercios calculen cuánto cobrar por un envío de manera consistente, rentable y profesional. Olvidate de calcular "a ojo" o perder plata en cada entrega.

## ✨ ¿Por qué RutaBase?

- **Precio justo al instante** – Calculá el costo de envío basado en combustible, tiempo, margen y condiciones del viaje.
- **Sin improvisar** – El desglose detallado te da trazabilidad y confianza frente a tus clientes.
- **Hecho para tu negocio** – Configurá tus propios parámetros: precio del combustible, consumo de tu vehículo, valor de tu hora, montos mínimos, redondeo y recargos por urgencia, lluvia, nocturnidad o zona complicada.
- **Historial claro** – Guardá tus cotizaciones, reutilizalas y mantené un registro de todas tus entregas.
- **Diseño limpio y rápido** – Interfaz sin distracciones, funciona perfecto en el celular mientras hacés los repartos.

## 🚀 MVP actual (sin backend)

Esta es la primera versión funcional de RutaBase, construida 100% en el frontend para validar la idea sin depender de servidores ni bases de datos.

- **Cálculo automático** del precio final con ida y vuelta.
- **Persistencia local** – Configuraciones e historial se guardan en tu navegador (localStorage).
- **Recargos configurables** – Activá las condiciones especiales que apliquen en tu zona.
- **Listo para el día a día** – Rápido, simple y profesional.

## 🛠 Stack tecnológico

- [React](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev) para desarrollo ultrarrápido
- [Tailwind CSS](https://tailwindcss.com) para estilos utilitarios
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) para validaciones
- [Lucide React](https://lucide.dev) para iconografía
- [localStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage) como almacenamiento local
