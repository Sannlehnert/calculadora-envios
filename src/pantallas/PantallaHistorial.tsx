import { useNavigate } from 'react-router-dom';
import { usarHistorial } from '../ganchos/usarHistorial';
import ResumenCotizacion from '../componentes/ResumenCotizacion';
import NotificacionEstado from '../componentes/NotificacionEstado';
import type { Cotizacion } from '../tipos';

export default function PantallaHistorial() {
  const { historial, eliminarCotizacion } = usarHistorial();
  const navigate = useNavigate();

  const manejarReutilizar = (cotizacion: Cotizacion) => {
    navigate('/calculadora', { state: { cotizacion } });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-xl font-semibold text-slate-800 mb-8">Historial de envíos</h1>
      {historial.length === 0 ? (
        <NotificacionEstado mensaje="Todavía no hay cotizaciones guardadas." tipo="info" />
      ) : (
        <ul className="divide-y divide-slate-200">
          {historial.map((cot) => (
            <li key={cot.id}>
              <ResumenCotizacion
                cotizacion={cot}
                onSeleccionar={manejarReutilizar}
                onEliminar={eliminarCotizacion}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}