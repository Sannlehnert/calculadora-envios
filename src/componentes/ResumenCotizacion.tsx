import type { Cotizacion } from '../tipos';

interface Props {
  cotizacion: Cotizacion;
  onSeleccionar: (cotizacion: Cotizacion) => void;
  onEliminar: (id: string) => void;
}

export default function ResumenCotizacion({ cotizacion, onSeleccionar, onEliminar }: Props) {
  const fecha = new Date(cotizacion.fecha).toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="py-3 flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-slate-900 truncate">
          {cotizacion.datosEnvio.origen} → {cotizacion.datosEnvio.destino}
        </p>
        <p className="text-xs text-slate-500">{fecha}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold text-slate-800">
          ${cotizacion.precioFinal.toFixed(2)}
        </span>
        <button
          onClick={() => onSeleccionar(cotizacion)}
          className="text-xs bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
          title="Usar de nuevo"
        >
          Reutilizar
        </button>
        <button
          onClick={() => onEliminar(cotizacion.id)}
          className="text-xs text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
          title="Eliminar"
        >
          ×
        </button>
      </div>
    </div>
  );
}