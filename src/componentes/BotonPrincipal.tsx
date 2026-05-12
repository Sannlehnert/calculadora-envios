import type { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  cargando?: boolean;
}

export default function BotonPrincipal({ children, cargando, className, ...props }: Props) {
  return (
    <button
      className={`w-full py-3 px-6 bg-blue-600 text-white font-semibold rounded-xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-70 ${className ?? ''}`}
      disabled={props.disabled || cargando}
      {...props}
    >
      {cargando ? 'Calculando...' : children}
    </button>
  );
}