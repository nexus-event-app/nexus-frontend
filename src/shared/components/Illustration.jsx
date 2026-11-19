import { cx } from '@/shared/utils/classNames'

/**
 * Ilustración decorativa (sin fondo propio: se ve el de la web, claro u oscuro; se prepara con
 * scripts/ilustracion-sin-fondo.py). Flota despacio y, al pasar el ratón, se inclina un poco y crece, para dar vida
 * sin distraer. Todo se desactiva con «reducir movimiento». Es decorativa: lo que cuenta ya está en el texto, así que
 * va oculta a los lectores de pantalla y no se descarga hasta que se ve.
 */
export default function Illustration({ src, width, height, animation = 'float', className }) {
  return (
    <figure aria-hidden="true" className={cx('group/illustration', className)}>
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className={cx(
          'h-auto w-full transition-transform duration-500 ease-out group-hover/illustration:-rotate-2 group-hover/illustration:scale-105',
          // `float`: flota despacio (la de siempre). `heartbeat`: late despacio, como un corazón. `nudge`: se balancea a
          // los lados como un aviso que llega.
          { heartbeat: 'animate-heartbeat', nudge: 'animate-nudge' }[animation] ?? 'animate-float',
        )}
      />
    </figure>
  )
}
