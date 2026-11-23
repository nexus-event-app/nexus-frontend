import { Link } from '@/shared/i18n/router'
import { paths } from '@/shared/config/paths'
import { cx } from '@/shared/utils/classNames'

export default function AuthorLink({ id, name, className }) {
  if (!id) return <span className={className}>{name}</span>
  return (
    <Link
      to={paths.profile({ id, name })}
      className={cx('relative z-10 -my-0.5 rounded-sm py-0.5 hover:text-accent hover:underline', className)}
    >
      {name}
    </Link>
  )
}
