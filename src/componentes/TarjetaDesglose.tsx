import type { DesglosePrecio } from '../tipos';

interface Props {
  desglose: DesglosePrecio;
}

export default function TarjetaDesglose({ desglose }: Props) {
  const filas = [
    { concepto: 'Combustible (ida y vuelta)', valor: desglose.costoCombustible },
    { concepto: 'Tiempo', valor: desglose.costoTiempo },
    { concepto: 'Margen operativo', valor: desglose.margen },
    ...(desglose.totalRecargos > 0
      ? [{ concepto: 'Recargos', valor: desglose.totalRecargos, destacado: true }]
      : []),
    { concepto: 'Subtotal antes de mínimo', valor: desglose.antesMinimo, esSubtotal: true },
    ...(desglose.antesMinimo < desglose.precioFinal
      ? [{ concepto: 'Ajuste al mínimo', valor: desglose.precioFinal, esTotal: true }]
      : []),
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-slate-500">Detalle del precio</h3>
      <ul className="divide-y divide-slate-200 text-sm">
        {filas.map((fila, i) => (
          <li key={i} className={`flex justify-between py-2 ${fila.destacado ? 'text-amber-700 font-medium' : ''} ${fila.esSubtotal ? 'font-medium text-slate-800 border-t border-slate-300' : ''} ${fila.esTotal ? 'text-slate-600' : ''}`}>
            <span>{fila.concepto}</span>
            <span>${fila.valor.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}