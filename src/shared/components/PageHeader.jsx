import { cx } from '@/shared/utils/classNames'
import ActionMenu from './ActionMenu'

/** Cabecera de página: título con su subtítulo y, si las hay, las acciones de la página. */
export default function PageHeader({ title, description, eyebrow, actions, className }) {
  return (
    <header className={cx('mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between', className)}>
      <hgroup className="max-w-3xl">
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-lg text-ink-muted">{description}</p>}
      </hgroup>
      <ActionMenu className="shrink-0 gap-3">{actions}</ActionMenu>
    </header>
  )
}
