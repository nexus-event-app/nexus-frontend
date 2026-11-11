import { useInView } from '@/shared/hooks/useInView'
import { useTypewriter } from '@/shared/hooks/useTypewriter'
import { cx } from '@/shared/utils/classNames'

const TONES = {
  light: { text: 'text-accent', halo: 'bg-accent-soft', dot: 'bg-brand-500 dark:bg-brand-400', caret: 'bg-accent' },
  dark: { text: 'text-brand-200', halo: 'bg-white/15', dot: 'bg-brand-200', caret: 'bg-brand-200' },
}

/**
 * Antetítulo de una sección: un punto con halo que late y el texto, que se escribe como en una máquina de escribir
 * cuando la sección entra en pantalla. Los lectores de pantalla oyen el texto completo desde el principio; el texto
 * entero ocupa ya su sitio (invisible) para que nada se mueva mientras se escribe.
 */
export default function Eyebrow({ children, tone = 'light', className }) {
  const text = String(children)
  const [ref, inView] = useInView()
  const { typed, done } = useTypewriter(text, { start: inView })
  const colors = TONES[tone]

  return (
    <p
      ref={ref}
      className={cx(
        'inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em]',
        colors.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cx('flex h-5 w-5 items-center justify-center rounded-full', colors.halo)}>
        <span className={cx('h-2 w-2 animate-soft-pulse rounded-full', colors.dot)} />
      </span>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="grid">
        <span className="invisible col-start-1 row-start-1">{text}</span>
        <span className="col-start-1 row-start-1 whitespace-nowrap">
          {typed}
          <span
            className={cx(
              'ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-[0.15em] animate-caret',
              colors.caret,
              done && 'opacity-0 transition-opacity delay-700 duration-500',
            )}
          />
        </span>
      </span>
    </p>
  )
}
