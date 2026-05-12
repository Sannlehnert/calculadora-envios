import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usarConfiguracion } from '../ganchos/usarConfiguracion';
import { esquemaParametrosNegocio } from '../validaciones/esquemas';
import type { ParametrosNegocio, Recargos } from '../tipos';
import EntradaNumerica from '../componentes/EntradaNumerica';
import BotonPrincipal from '../componentes/BotonPrincipal';
import InterruptorRecargo from '../componentes/InterruptorRecargo';
import { useEffect, useState } from 'react';

export default function PantallaConfiguracion() {
  const { parametros, recargos, actualizarParametros, actualizarRecargos } = usarConfiguracion();
  const [recargosLocales, setRecargosLocales] = useState<Recargos>(recargos);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ParametrosNegocio>({
    resolver: zodResolver(esquemaParametrosNegocio),
    defaultValues: parametros,
  });

  useEffect(() => {
    reset(parametros);
    setRecargosLocales(recargos);
  }, [parametros, recargos, reset]);

  const onSubmit = (datos: ParametrosNegocio) => {
    actualizarParametros(datos);
    actualizarRecargos(recargosLocales);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <h1 className="text-xl font-semibold text-slate-800 mb-8">Configuración de negocio</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Parámetros</h2>
          <div className="grid grid-cols-2 gap-4">
            <EntradaNumerica
              label="Precio combustible"
              unidad="$/lt"
              error={errors.precioCombustible?.message}
              registro={register('precioCombustible', { valueAsNumber: true })}
            />
            <EntradaNumerica
              label="Consumo"
              unidad="km/lt"
              error={errors.kmPorLitro?.message}
              registro={register('kmPorLitro', { valueAsNumber: true })}
            />
            <EntradaNumerica
              label="Valor hora"
              unidad="$"
              error={errors.valorHora?.message}
              registro={register('valorHora', { valueAsNumber: true })}
            />
            <EntradaNumerica
              label="Margen operativo"
              unidad="%"
              error={errors.margenPorcentaje?.message}
              registro={register('margenPorcentaje', { valueAsNumber: true })}
            />
            <EntradaNumerica
              label="Monto mínimo"
              unidad="$"
              error={errors.montoMinimo?.message}
              registro={register('montoMinimo', { valueAsNumber: true })}
            />
            <EntradaNumerica
              label="Redondeo múltiplo"
              unidad="$"
              error={errors.redondeoMultiplo?.message}
              registro={register('redondeoMultiplo', { valueAsNumber: true })}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide">Recargos por defecto</h2>
          <div className="space-y-1">
            <InterruptorRecargo
              label="Urgencia"
              checked={recargosLocales.urgencia}
              onChange={(v) => setRecargosLocales({ ...recargosLocales, urgencia: v })}
              porcentaje={recargosLocales.valores.urgencia}
            />
            <InterruptorRecargo
              label="Lluvia"
              checked={recargosLocales.lluvia}
              onChange={(v) => setRecargosLocales({ ...recargosLocales, lluvia: v })}
              porcentaje={recargosLocales.valores.lluvia}
            />
            <InterruptorRecargo
              label="Nocturnidad"
              checked={recargosLocales.nocturnidad}
              onChange={(v) => setRecargosLocales({ ...recargosLocales, nocturnidad: v })}
              porcentaje={recargosLocales.valores.nocturnidad}
            />
            <InterruptorRecargo
              label="Zona complicada"
              checked={recargosLocales.zonaComplicada}
              onChange={(v) => setRecargosLocales({ ...recargosLocales, zonaComplicada: v })}
              porcentaje={recargosLocales.valores.zonaComplicada}
            />
          </div>
          <p className="text-xs text-slate-400">Los porcentajes de recargo se editarán en una versión futura.</p>
        </section>

        <BotonPrincipal type="submit" disabled={!isDirty}>
          Guardar cambios
        </BotonPrincipal>
      </form>
    </div>
  );
}