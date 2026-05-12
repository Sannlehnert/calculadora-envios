interface Props {
  mensaje: string;
  tipo: 'exito' | 'error' | 'info';
  className?: string;
}

export default function NotificacionEstado({ mensaje, tipo, className }: Props) {
  const colores = {
    exito: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
  };
  return (
    <div className={`${colores[tipo]} border rounded-lg p-3 text-sm ${className ?? ''}`}>
      {mensaje}
    </div>
  );
}