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

  // Si se reutiliza una cotización, reseteamos el formulario con esos valores y actualizamos recargos
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
      // Limpiamos el state para que no se vuelva a cargar al refrescar
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
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Calculá tu envío</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-slate-500 uppercase tracking-wide">Datos del viaje</legend>
          <EntradaDireccion label="Origen" error={errors.origen?.message} registro={register('origen')} />
          <EntradaDireccion label="Destino" error={errors.destino?.message} registro={register('destino')} />
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
          <Controller
            name="transporte"
            control={control}
            render={({ field }) => (
              <SelectorTransporte valor={field.value} onChange={field.onChange} />
            )}
          />
        </fieldset>

        <fieldset>
          <legend className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-2">Recargos opcionales</legend>
          <div className="bg-slate-50 rounded-xl p-4 space-y-2">
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
        </fieldset>

        <BotonPrincipal type="submit" disabled={!isValid}>
          Calcular precio
        </BotonPrincipal>
      </form>

      {mostrarResultado && desglose && (
        <div className="mt-6 space-y-4">
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