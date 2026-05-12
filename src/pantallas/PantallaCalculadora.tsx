import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { esquemaDatosEnvio } from '../validaciones/esquemas';
import { usarCotizacion } from '../ganchos/usarCotizacion';
import { usarConfiguracion } from '../ganchos/usarConfiguracion';
import { usarHistorial } from '../ganchos/usarHistorial';
import type { DatosEnvio, Recargos, Cotizacion } from '../tipos';
import EntradaDireccion from '../componentes/EntradaDireccion';
import EntradaNumerica from '../componentes/EntradaNumerica';
import SelectorTransporte from '../componentes/SelectorTransporte';
import InterruptorRecargo from '../componentes/InterruptorRecargo';
import BotonPrincipal from '../componentes/BotonPrincipal';
import TarjetaResultado from '../componentes/TarjetaResultado';
import TarjetaDesglose from '../componentes/TarjetaDesglose';

export default function PantallaCalculadora() {
  const location = useLocation();
  const stateCotizacion = (location.state as { cotizacion?: Cotizacion })?.cotizacion;

  const { parametros, recargos: recargosDefault } = usarConfiguracion();
  const { cotizar, guardarCotizacion, desglose } = usarCotizacion();
  const { agregarCotizacion } = usarHistorial();

  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [recargosActivos, setRecargosActivos] = useState<Recargos>(
    stateCotizacion?.recargosAplicados ?? recargosDefault
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<DatosEnvio>({
    resolver: zodResolver(esquemaDatosEnvio),
    mode: 'onChange',
    defaultValues: {
      origen: stateCotizacion?.datosEnvio.origen ?? '',
      destino: stateCotizacion?.datosEnvio.destino ?? '',
      distanciaKm: stateCotizacion?.datosEnvio.distanciaKm ?? 0,
      tiempoMinutos: stateCotizacion?.datosEnvio.tiempoMinutos ?? 0,
      transporte: stateCotizacion?.datosEnvio.transporte ?? 'auto',
    },
  });

  useEffect(() => {
    if (stateCotizacion) {
      reset({
        origen: stateCotizacion.datosEnvio.origen,
        destino: stateCotizacion.datosEnvio.destino,
        distanciaKm: stateCotizacion.datosEnvio.distanciaKm,
        tiempoMinutos: stateCotizacion.datosEnvio.tiempoMinutos,
        transporte: stateCotizacion.datosEnvio.transporte,
      });
      setRecargosActivos(stateCotizacion.recargosAplicados);
      window.history.replaceState({}, document.title);
    }
  }, [stateCotizacion, reset]);

  const onSubmit = (datos: DatosEnvio) => {
    cotizar(datos, parametros, recargosActivos);
    setMostrarResultado(true);
  };

  const handleGuardar = () => {
    const datos = watch();
    if (desglose) {
      const nueva = guardarCotizacion(datos, parametros, recargosActivos, desglose);
      agregarCotizacion(nueva);
    }
  };

  const handleCopiar = () => {
    if (desglose) {
      navigator.clipboard.writeText(`$${desglose.precioFinal.toFixed(2)}`);
      alert('Precio copiado al portapapeles');
    }
  };

  const handleNuevoCalculo = () => {
    setMostrarResultado(false);
    reset();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      {/* Encabezado sutil */}
      <h1 className="text-xl font-semibold text-slate-800 mb-8">Nuevo cálculo</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Sección 1: Origen y destino */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Recorrido</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <EntradaDireccion label="Origen" error={errors.origen?.message} registro={register('origen')} />
            <EntradaDireccion label="Destino" error={errors.destino?.message} registro={register('destino')} />
          </div>
        </section>

        {/* Sección 2: Transporte */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Medio de transporte</h2>
          <Controller
            name="transporte"
            control={control}
            render={({ field }) => (
              <SelectorTransporte valor={field.value} onChange={field.onChange} />
            )}
          />
        </section>

        {/* Sección 3: Distancia y tiempo */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Detalles del viaje</h2>
          <div className="grid grid-cols-2 gap-4">
            <EntradaNumerica
              label="Distancia"
              unidad="km"
              error={errors.distanciaKm?.message}
              registro={register('distanciaKm', { valueAsNumber: true })}
            />
            <EntradaNumerica
              label="Tiempo"
              unidad="min"
              error={errors.tiempoMinutos?.message}
              registro={register('tiempoMinutos', { valueAsNumber: true })}
            />
          </div>
        </section>

        {/* Sección 4: Recargos */}
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Condiciones especiales</h2>
          <div className="space-y-1">
            <InterruptorRecargo
              label="Urgencia"
              checked={recargosActivos.urgencia}
              onChange={(v) => setRecargosActivos({ ...recargosActivos, urgencia: v })}
              porcentaje={recargosActivos.valores.urgencia}
            />
            <InterruptorRecargo
              label="Lluvia"
              checked={recargosActivos.lluvia}
              onChange={(v) => setRecargosActivos({ ...recargosActivos, lluvia: v })}
              porcentaje={recargosActivos.valores.lluvia}
            />
            <InterruptorRecargo
              label="Nocturnidad"
              checked={recargosActivos.nocturnidad}
              onChange={(v) => setRecargosActivos({ ...recargosActivos, nocturnidad: v })}
              porcentaje={recargosActivos.valores.nocturnidad}
            />
            <InterruptorRecargo
              label="Zona complicada"
              checked={recargosActivos.zonaComplicada}
              onChange={(v) => setRecargosActivos({ ...recargosActivos, zonaComplicada: v })}
              porcentaje={recargosActivos.valores.zonaComplicada}
            />
          </div>
        </section>

        <BotonPrincipal type="submit" disabled={!isValid} cargando={false}>
          Calcular precio
        </BotonPrincipal>
      </form>

      {/* Resultado dominante */}
      {mostrarResultado && desglose && (
        <div className="mt-12 space-y-6">
          <TarjetaResultado
            desglose={desglose}
            onCopiar={handleCopiar}
            onGuardar={handleGuardar}
            onNuevoCalculo={handleNuevoCalculo}
          />
          <TarjetaDesglose desglose={desglose} />
        </div>
      )}
    </div>
  );
}