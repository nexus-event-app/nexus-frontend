import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

/**
 * Terminal decorativa: el «primer commit» que da nombre al proyecto. Estaba en la cabecera de «Sobre el proyecto»;
 * se guarda para usarla en otra parte. Colores fijos (gris muy oscuro)
 * en los dos temas; el cursor parpadea y se queda quieto con «reducir movimiento». Oculta a los lectores de pantalla:
 * no añade información.
 */
export default function FirstCommitTerminal({ className }) {
  const { t } = useI18n()
  return (
    <figure
      aria-hidden="true"
      className={cx(
        'overflow-hidden rounded-2xl bg-gray-950 font-mono text-sm shadow-pop ring-1 ring-white/10',
        className,
      )}
    >
      <figcaption className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-gray-700" />
        <span className="h-3 w-3 rounded-full bg-gray-700" />
        <span className="h-3 w-3 rounded-full bg-gray-700" />
        <span className="ml-2 text-xs text-gray-400">~/mi-carrera-tech</span>
      </figcaption>
      <pre className="overflow-x-auto whitespace-pre-wrap px-5 py-5 leading-7 text-gray-300">
        <code>
          <span className="text-brand-300">$</span> git init{'\n'}
          <span className="text-brand-300">$</span> git add curiosidad.txt ganas.txt{'\n'}
          <span className="text-brand-300">$</span> git commit -m &quot;{t('about.terminal.message')}&quot;{'\n'}
          <span className="text-gray-400">[main (root-commit) a1f3c2e]</span>{' '}
          <span className="text-white">{t('about.terminal.output')}</span>
          {'\n'}
          <span className="text-brand-300">$</span>{' '}
          <span className="inline-block h-4 w-2 translate-y-0.5 animate-caret bg-brand-300" />
        </code>
      </pre>
    </figure>
  )
}
