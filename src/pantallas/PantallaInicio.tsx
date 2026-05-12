import { Link } from 'react-router-dom';
import BotonPrincipal from '../componentes/BotonPrincipal';

export default function PantallaInicio() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">EnvíoSmart</h1>
      <p className="text-lg text-slate-600 mb-8">
        Calculá cuánto cobrar por tus envíos de forma rápida, clara y profesional.
      </p>
      <Link to="/">
        <BotonPrincipal>Empezar a calcular</BotonPrincipal>
      </Link>
    </div>
  );
}