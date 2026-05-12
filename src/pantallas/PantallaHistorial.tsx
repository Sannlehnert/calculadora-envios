import { useNavigate } from 'react-router-dom';
import { usarHistorial } from '../ganchos/usarHistorial';
import ResumenCotizacion from '../componentes/ResumenCotizacion';
import NotificacionEstado from '../componentes/NotificacionEstado';
import type { Cotizacion } from '../tipos';

export default function PantallaHistorial() {
  const { historial, eliminarCotizacion } = usarHistorial();
  const navigate = useNavigate();

  const manejarReutilizar = (cotizacion: Cotizacion) => {
    // Pasamos la cotización completa a la calculadora mediante el state de la ruta
    navigate('/', { state: { cotizacion } });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Historial de envíos</h1>
      {historial.length === 0 ? (
        <NotificacionEstado mensaje="Todavía no hay cotizaciones guardadas." tipo="info" />
      ) : (
        <div className="space-y-3">
          {historial.map((cot) => (
            <ResumenCotizacion
              key={cot.id}
              cotizacion={cot}
              onSeleccionar={() => manejarReutilizar(cot)}
              onEliminar={eliminarCotizacion}
            />
          ))}
        </div>
      )}
    </div>
  );
}