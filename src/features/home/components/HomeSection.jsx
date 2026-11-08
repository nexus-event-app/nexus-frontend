import { Link } from '@/shared/i18n/router'
import SectionHeader from '@/shared/components/SectionHeader'
import { cx } from '@/shared/utils/classNames'

export default function HomeSection({ id, title, description, linkTo, linkLabel, tinted = false, children }) {
  return (
    <section aria-labelledby={id} className={cx('page-section', tinted && 'bg-white')}>
      <div className="page-container">
        <SectionHeader
          id={id}
          title={title}
          description={description}
          action={
            linkTo && (
              <Link to={linkTo} className="link inline-flex min-h-[2.75rem] shrink-0 items-center">
                {linkLabel}
              </Link>
            )
          }
        />
        {children}
      </div>
    </section>
  )
}
