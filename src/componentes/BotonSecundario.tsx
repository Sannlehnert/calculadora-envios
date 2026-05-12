import type { ButtonHTMLAttributes } from 'react';

export default function BotonSecundario({ children, className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`border border-slate-300 bg-white text-slate-700 font-medium px-4 py-2 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}