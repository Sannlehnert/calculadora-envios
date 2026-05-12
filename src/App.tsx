import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DiseñoPrincipal from './diseños/DiseñoPrincipal';
import PantallaInicio from './pantallas/PantallaInicio';
import PantallaCalculadora from './pantallas/PantallaCalculadora';
import PantallaHistorial from './pantallas/PantallaHistorial';
import PantallaConfiguracion from './pantallas/PantallaConfiguracion';

export default function App() {
  return (
    <BrowserRouter>
      <DiseñoPrincipal>
        <Routes>
          <Route path="/" element={<PantallaInicio />} />
          <Route path="/calculadora" element={<PantallaCalculadora />} />
          <Route path="/historial" element={<PantallaHistorial />} />
          <Route path="/configuracion" element={<PantallaConfiguracion />} />
        </Routes>
      </DiseñoPrincipal>
    </BrowserRouter>
  );
}