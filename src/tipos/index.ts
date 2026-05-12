export interface DatosEnvio {
  origen: string;
  destino: string;
  distanciaKm: number;
  tiempoMinutos: number;
  transporte: 'auto' | 'moto' | 'camioneta' | 'bicicleta';
}

export interface ParametrosNegocio {
  precioCombustible: number;
  kmPorLitro: number; // antes consumoLitroPorKm
  valorHora: number;
  margenPorcentaje: number;
  montoMinimo: number;
  redondeoMultiplo: number;
}

export interface Recargos {
  urgencia: boolean;
  lluvia: boolean;
  nocturnidad: boolean;
  zonaComplicada: boolean;
  valores: {
    urgencia: number;
    lluvia: number;
    nocturnidad: number;
    zonaComplicada: number;
  };
}

export interface Cotizacion {
  id: string;
  fecha: string;
  datosEnvio: DatosEnvio;
  parametros: ParametrosNegocio;
  recargosAplicados: Recargos;
  desglose: DesglosePrecio;
  precioFinal: number;
}

export interface DesglosePrecio {
  costoCombustible: number;
  costoTiempo: number;
  subtotal: number;
  margen: number;
  totalRecargos: number;
  antesMinimo: number;
  precioFinal: number;
}