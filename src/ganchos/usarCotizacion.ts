import { useState, useCallback } from 'react';
import type { Cotizacion, DesglosePrecio, DatosEnvio, ParametrosNegocio, Recargos } from '../tipos';
import { calcularPrecioEnvio } from '../utilidades/calcularPrecioEnvio';
import { guardarHistorial, obtenerHistorial } from '../servicios/almacenamiento';

export function usarCotizacion() {
  const [desglose, setDesglose] = useState<DesglosePrecio | null>(null);
  const [precioFinal, setPrecioFinal] = useState<number | null>(null);

  const cotizar = useCallback(
    (datos: DatosEnvio, params: ParametrosNegocio, recargos: Recargos) => {
      const resultado = calcularPrecioEnvio(datos, params, recargos);
      setDesglose(resultado);
      setPrecioFinal(resultado.precioFinal);
      return resultado;
    },
    []
  );

  const guardarCotizacion = useCallback(
    (datos: DatosEnvio, params: ParametrosNegocio, recargos: Recargos, desgloseItem: DesglosePrecio) => {
      const nueva: Cotizacion = {
        id: crypto.randomUUID(),
        fecha: new Date().toISOString(),
        datosEnvio: datos,
        parametros: params,
        recargosAplicados: recargos,
        desglose: desgloseItem,
        precioFinal: desgloseItem.precioFinal,
      };
      const anterior = obtenerHistorial();
      guardarHistorial([nueva, ...anterior]);
      return nueva;
    },
    []
  );

  return { cotizar, guardarCotizacion, desglose, precioFinal };
}