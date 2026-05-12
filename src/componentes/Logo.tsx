import { Link } from 'react-router-dom';

interface Props {
  className?: string;
}

export default function Logo({ className }: Props) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-bold text-slate-900 hover:text-blue-600 transition-colors ${className ?? ''}`}>
      <img src="/RutaBase.png" alt="RutaBase" className="h-8 w-8" />
      <span className="text-lg">RutaBase</span>
    </Link>
  );
}