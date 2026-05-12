import { useState, useEffect, useCallback } from 'react';
import type { ParametrosNegocio, Recargos } from '../tipos';
import {
  guardarParametros,
  obtenerParametros,
  guardarRecargosDefault,
  obtenerRecargosDefault,
} from '../servicios/almacenamiento';

export function usarConfiguracion() {
  const [parametros, setParametros] = useState<ParametrosNegocio>(obtenerParametros());
  const [recargos, setRecargos] = useState<Recargos>(obtenerRecargosDefault());

  useEffect(() => {
    const inicial = obtenerParametros();
    setParametros(inicial);
    const recInicial = obtenerRecargosDefault();
    setRecargos(recInicial);
  }, []);

  const actualizarParametros = useCallback((nuevos: ParametrosNegocio) => {
    setParametros(nuevos);
    guardarParametros(nuevos);
  }, []);

  const actualizarRecargos = useCallback((nuevos: Recargos) => {
    setRecargos(nuevos);
    guardarRecargosDefault(nuevos);
  }, []);

  return { parametros, recargos, actualizarParametros, actualizarRecargos };
}