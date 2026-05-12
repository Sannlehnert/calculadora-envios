import { useState, useCallback } from 'react';
import type { Cotizacion } from '../tipos';
import { obtenerHistorial, guardarHistorial } from '../servicios/almacenamiento';

export function usarHistorial() {
  const [historial, setHistorial] = useState<Cotizacion[]>(obtenerHistorial());

  const agregarCotizacion = useCallback(
    (cot: Cotizacion) => {
      const nuevo = [cot, ...historial].slice(0, 50);
      setHistorial(nuevo);
      guardarHistorial(nuevo);
    },
    [historial]
  );

  const eliminarCotizacion = useCallback(
    (id: string) => {
      const filtrado = historial.filter((c) => c.id !== id);
      setHistorial(filtrado);
      guardarHistorial(filtrado);
    },
    [historial]
  );

  return { historial, agregarCotizacion, eliminarCotizacion };
}