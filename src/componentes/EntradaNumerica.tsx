import type { UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  label: string;
  unidad?: string;
  error?: string;
  registro: UseFormRegisterReturn;
  min?: number;
  step?: string;
}

export default function EntradaNumerica({ label, unidad, error, registro, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-slate-700">
        {label} {unidad && <span className="text-slate-400 text-xs font-normal">({unidad})</span>}
      </label>
      <input
        type="number"
        inputMode="decimal"
        step="any"
        className={`rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-500 focus:ring-red-500'
            : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        {...registro}
        {...rest}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}