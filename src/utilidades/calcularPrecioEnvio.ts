import type { DatosEnvio, ParametrosNegocio, Recargos, DesglosePrecio } from '../tipos';

export function calcularPrecioEnvio(
  datos: DatosEnvio,
  params: ParametrosNegocio,
  recargos: Recargos
): DesglosePrecio {
  const distanciaIdaVuelta = datos.distanciaKm * 2;
  // params.kmPorLitro = cuántos km recorre con 1 litro
  const costoCombustible = (distanciaIdaVuelta / params.kmPorLitro) * params.precioCombustible;
  const costoTiempo = (datos.tiempoMinutos / 60) * params.valorHora;

  const subtotal = costoCombustible + costoTiempo;
  const margen = subtotal * (params.margenPorcentaje / 100);

  let totalRecargos = 0;
  if (recargos.urgencia) totalRecargos += subtotal * (recargos.valores.urgencia / 100);
  if (recargos.lluvia) totalRecargos += subtotal * (recargos.valores.lluvia / 100);
  if (recargos.nocturnidad) totalRecargos += subtotal * (recargos.valores.nocturnidad / 100);
  if (recargos.zonaComplicada) totalRecargos += subtotal * (recargos.valores.zonaComplicada / 100);

  const antesMinimo = subtotal + margen + totalRecargos;
  let precioFinal = antesMinimo < params.montoMinimo ? params.montoMinimo : antesMinimo;

  if (params.redondeoMultiplo > 0) {
    precioFinal = Math.ceil(precioFinal / params.redondeoMultiplo) * params.redondeoMultiplo;
  }

  return {
    costoCombustible,
    costoTiempo,
    subtotal,
    margen,
    totalRecargos,
    antesMinimo,
    precioFinal,
  };
}