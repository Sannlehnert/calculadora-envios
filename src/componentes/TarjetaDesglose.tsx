import type { DesglosePrecio } from '../tipos';

interface Props {
  desglose: DesglosePrecio;
}

export default function TarjetaDesglose({ desglose }: Props) {
  return (
    <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
      <h3 className="font-medium text-slate-700 mb-2">Detalle del precio</h3>
      <div className="flex justify-between"><span>Combustible (ida y vuelta)</span><span>${desglose.costoCombustible.toFixed(2)}</span></div>
      <div className="flex justify-between"><span>Tiempo</span><span>${desglose.costoTiempo.toFixed(2)}</span></div>
      <div className="flex justify-between"><span>Margen operativo</span><span>${desglose.margen.toFixed(2)}</span></div>
      {desglose.totalRecargos > 0 && (
        <div className="flex justify-between text-amber-700 font-medium"><span>Recargos</span><span>${desglose.totalRecargos.toFixed(2)}</span></div>
      )}
      <hr className="border-slate-200" />
      <div className="flex justify-between font-medium"><span>Subtotal</span><span>${desglose.antesMinimo.toFixed(2)}</span></div>
      {desglose.antesMinimo < desglose.precioFinal && (
        <div className="flex justify-between text-slate-500"><span>Ajuste al mínimo</span><span>${desglose.precioFinal.toFixed(2)}</span></div>
      )}
    </div>
  );
}