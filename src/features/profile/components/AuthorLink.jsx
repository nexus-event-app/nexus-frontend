import { Link } from '@/shared/i18n/router'
import { paths } from '@/shared/config/paths'
import { cx } from '@/shared/utils/classNames'

/** Nombre de una persona enlazado a su perfil público (o texto plano si no tiene cuenta). */
export default function AuthorLink({ id, name, className }) {
  if (!id) return <span className={className}>{name}</span>
  return (
    <Link
      to={paths.profile({ id, name })}
      className={cx('relative z-10 rounded-sm hover:text-accent hover:underline', className)}
    >
      {name}
    </Link>
  )
}
