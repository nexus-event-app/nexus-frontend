import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

/**
 * «Leer más →» al pie de una tarjeta cuyo texto está recortado. Es solo una indicación visual: la tarjeta entera
 * ya es un enlace a la ficha, así que se oculta a los lectores de pantalla para no repetir el enlace.
 */
export default function ReadMoreHint({ className }) {
  const { t } = useI18n()
  return (
    <span
      aria-hidden="true"
      className={cx('inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent', className)}
    >
      {t('common.readMore')}
      <Icon name="arrow-right" className="h-4 w-4" />
    </span>
  )
}
