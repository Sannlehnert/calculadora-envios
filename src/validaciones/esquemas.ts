import { z } from 'zod';

export const esquemaDatosEnvio = z.object({
  origen: z.string().min(1, 'Ingresá el origen'),
  destino: z.string().min(1, 'Ingresá el destino'),
  distanciaKm: z.number().positive('La distancia debe ser mayor a 0 km'),
  tiempoMinutos: z.number().positive('El tiempo debe ser mayor a 0 min'),
  transporte: z.enum(['auto', 'moto', 'camioneta', 'bicicleta'], {
    message: 'Seleccioná un medio de transporte',
  }),
});

export const esquemaParametrosNegocio = z.object({
  precioCombustible: z.number().positive('Debe ser mayor a 0'),
  kmPorLitro: z.number().positive('Mayor a 0'),
  valorHora: z.number().positive('Mayor a 0'),
  margenPorcentaje: z.number().min(0).max(100),
  montoMinimo: z.number().min(0),
  redondeoMultiplo: z.number().min(1).max(10000),
});