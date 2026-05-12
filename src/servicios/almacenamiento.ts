import type { ParametrosNegocio, Recargos, Cotizacion } from '../tipos';

const CLAVE_PARAMS = 'parametros_negocio';
const CLAVE_RECARGOS = 'recargos_default';
const CLAVE_HISTORIAL = 'historial_cotizaciones';

export function guardarParametros(params: ParametrosNegocio) {
  localStorage.setItem(CLAVE_PARAMS, JSON.stringify(params));
}

export function obtenerParametros(): ParametrosNegocio {
  const raw = localStorage.getItem(CLAVE_PARAMS);
  if (raw) return JSON.parse(raw);
  // Valores por defecto realistas (Neuquén, moto 35 km/lt)
  return {
    precioCombustible: 1.787,
    kmPorLitro: 35,
    valorHora: 8000,
    margenPorcentaje: 20,
    montoMinimo: 1000,
    redondeoMultiplo: 500,
  };
}

export function guardarRecargosDefault(r: Recargos) {
  localStorage.setItem(CLAVE_RECARGOS, JSON.stringify(r));
}

export function obtenerRecargosDefault(): Recargos {
  const raw = localStorage.getItem(CLAVE_RECARGOS);
  if (raw) return JSON.parse(raw);
  return {
    urgencia: false,
    lluvia: false,
    nocturnidad: false,
    zonaComplicada: false,
    valores: {
      urgencia: 15,
      lluvia: 10,
      nocturnidad: 20,
      zonaComplicada: 10,
    },
  };
}

export function guardarHistorial(cotizaciones: Cotizacion[]) {
  localStorage.setItem(CLAVE_HISTORIAL, JSON.stringify(cotizaciones.slice(0, 50)));
}

export function obtenerHistorial(): Cotizacion[] {
  const raw = localStorage.getItem(CLAVE_HISTORIAL);
  if (raw) return JSON.parse(raw);
  return [];
}