import { Car, Motorbike, Truck, Bike } from 'lucide-react';

const opciones = [
  { valor: 'auto', label: 'Auto', Icono: Car },
  { valor: 'moto', label: 'Moto', Icono: Motorbike },
  { valor: 'camioneta', label: 'Camioneta', Icono: Truck },
  { valor: 'bicicleta', label: 'Bicicleta', Icono: Bike },
] as const;

interface Props {
  valor: string;
  onChange: (valor: string) => void;
}

export default function SelectorTransporte({ valor, onChange }: Props) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-700 mb-2">Medio de transporte</p>
      <div className="grid grid-cols-4 gap-2">
        {opciones.map(({ valor: v, label, Icono }) => (
          <button
            key={v}
            type="button"
            onClick={() => onChange(v)}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg border transition-all ${
              valor === v
                ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
            }`}
          >
            <Icono size={20} />
            <span className="text-xs">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}