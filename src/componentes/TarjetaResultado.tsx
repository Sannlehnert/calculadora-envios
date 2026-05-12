import type { DesglosePrecio } from '../tipos';

interface Props {
  desglose: DesglosePrecio;
  onCopiar: () => void;
  onGuardar: () => void;
  onNuevoCalculo: () => void;
}

export default function TarjetaResultado({ desglose, onCopiar, onGuardar, onNuevoCalculo }: Props) {
  return (
    <div className="bg-slate-50 rounded-xl p-6 sm:p-8">
      <div className="text-center mb-6">
        <p className="text-sm text-slate-500 mb-2">Precio sugerido</p>
        <p className="text-5xl sm:text-6xl font-bold text-slate-900 tracking-tight">
          ${desglose.precioFinal.toLocaleString('es-AR', { minimumFractionDigits: 2 })}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button onClick={onCopiar} className="flex-1 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
          Copiar
        </button>
        <button onClick={onGuardar} className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 transition">
          Guardar
        </button>
        <button onClick={onNuevoCalculo} className="flex-1 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition">
          Nuevo
        </button>
      </div>
    </div>
  );
}