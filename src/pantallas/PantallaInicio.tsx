import { Link } from 'react-router-dom';
import { Calculator, History, Settings } from 'lucide-react';

export default function PantallaInicio() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center">
      <img src="RutaBase.png" alt="RutaBase" className="h-16 w-16 mx-auto mb-6" />
      <h1 className="text-4xl font-bold text-slate-900 mb-4">RutaBase</h1>
      <p className="text-lg text-slate-600 max-w-md mx-auto mb-8">
        Calculá el precio justo de tus envíos como revendedor, sin perder plata ni tiempo.
      </p>
      <Link
        to="/calculadora"
        className="inline-flex items-center justify-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Empezar a calcular
      </Link>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-700">
        <div className="flex flex-col items-center">
          <Calculator size={28} className="text-blue-600 mb-3" />
          <h3 className="font-medium">Cálculo inteligente</h3>
          <p className="text-sm text-slate-500">Combustible, tiempo, margen y recargos en un solo clic.</p>
        </div>
        <div className="flex flex-col items-center">
          <History size={28} className="text-blue-600 mb-3" />
          <h3 className="font-medium">Historial</h3>
          <p className="text-sm text-slate-500">Reutilizá cálculos anteriores sin repetir datos.</p>
        </div>
        <div className="flex flex-col items-center">
          <Settings size={28} className="text-blue-600 mb-3" />
          <h3 className="font-medium">Configurable</h3>
          <p className="text-sm text-slate-500">Ajustá parámetros según tu vehículo y realidad.</p>
        </div>
      </div>
    </div>
  );
}