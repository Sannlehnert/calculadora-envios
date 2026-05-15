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
  // Extraemos el onChange que viene de RHF para manipularlo
  const { onChange: rhfOnChange, ...restRegistro } = registro;

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Reemplazamos coma por punto para que sea un número válido
    const valorConPunto = e.target.value.replace(',', '.');
    e.target.value = valorConPunto;
    rhfOnChange(e);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {unidad && <span className="text-slate-400 font-normal">({unidad})</span>}
      </label>
      <input
        type="text"
        inputMode="decimal"
        className={`rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-1 ${
          error
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        {...restRegistro}
        onChange={manejarCambio}
        {...rest}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}