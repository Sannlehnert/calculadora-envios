import { Link, useLocation } from 'react-router-dom';
import { Calculator, Clock, Settings } from 'lucide-react';

const enlaces = [
  { to: '/', label: 'Calculadora', Icon: Calculator },
  { to: '/historial', label: 'Historial', Icon: Clock },
  { to: '/configuracion', label: 'Ajustes', Icon: Settings },
];

export default function DiseñoPrincipal({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 py-4 px-6 hidden sm:block">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-lg font-bold text-slate-900">
            EnvíoSmart
          </Link>
          <nav className="flex gap-6 text-sm text-slate-600">
            {enlaces.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`hover:text-blue-600 transition-colors ${
                  location.pathname === to ? 'text-blue-600 font-medium' : ''
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 pb-20 sm:pb-6">{children}</main>

      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex justify-around py-2 sm:hidden">
        {enlaces.map(({ to, label, Icon }) => (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center gap-1 text-xs ${
              location.pathname === to ? 'text-blue-600' : 'text-slate-500'
            }`}
          >
            <Icon size={20} />
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}