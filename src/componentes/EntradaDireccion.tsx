import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  error?: string;
  registro: UseFormRegisterReturn;
  placeholder?: string;
}

export default function EntradaDireccion({ label, error, registro, placeholder }: Props) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type="text"
        placeholder={placeholder ?? `Ej: ${label}`}
        className={`rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        {...registro}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}