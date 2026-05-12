import type { DesglosePrecio } from '../tipos';

interface Props {
  desglose: DesglosePrecio;
  onCopiar: () => void;
  onGuardar: () => void;
  onNuevoCalculo: () => void;
}

export default function TarjetaResultado({ desglose, onCopiar, onGuardar, onNuevoCalculo }: Props) {
  return (
    <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Precio final</h2>
      <p className="text-4xl font-bold text-slate-900">
        ${desglose.precioFinal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
      </p>
      <div className="flex flex-col sm:flex-row gap-2">
        <button onClick={onCopiar} className="flex-1 text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors">
          Copiar precio
        </button>
        <button onClick={onGuardar} className="flex-1 text-sm bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors">
          Guardar en historial
        </button>
        <button onClick={onNuevoCalculo} className="flex-1 text-sm border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-lg transition-colors">
          Nuevo cálculo
        </button>
      </div>
    </section>
  );
}