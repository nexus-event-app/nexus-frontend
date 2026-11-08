import { Link } from '@/shared/i18n/router'
import { buttonClasses } from '@/shared/utils/buttonClasses'

export default function ButtonLink({ to, variant = 'primary', size = 'md', className, children, ...props }) {
  return (
    <Link to={to} className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </Link>
  )
}
