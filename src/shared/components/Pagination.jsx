import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import Icon from './Icon'

const ITEM_CLASSES =
  'inline-flex min-h-[2.75rem] min-w-[2.75rem] items-center justify-center gap-1 rounded-control px-3 text-sm font-semibold'

function pageItems(page, totalPages) {
  const wanted = new Set([1, totalPages, page - 1, page, page + 1])
  const sorted = [...wanted].filter((value) => value >= 1 && value <= totalPages).sort((a, b) => a - b)
  return sorted.flatMap((value, index) => (index > 0 && value - sorted[index - 1] > 1 ? ['gap', value] : [value]))
}

export default function Pagination({ page, totalPages, buildHref, label }) {
  const { t } = useI18n()
  if (!totalPages || totalPages <= 1) return null

  const items = pageItems(page, totalPages)

  return (
    <nav aria-label={label ?? t('common.pagination.label')} className="mt-10">
      <ul className="flex flex-wrap items-center justify-center gap-1">
        <li>
          {page > 1 ? (
            <Link to={buildHref(page - 1)} rel="prev" className={cx(ITEM_CLASSES, 'text-ink-soft hover:bg-slate-100')}>
              <Icon name="chevron-left" className="h-4 w-4" />
              {t('common.pagination.previous')}
            </Link>
          ) : (
            <span className={cx(ITEM_CLASSES, 'text-slate-400')} aria-disabled="true">
              <Icon name="chevron-left" className="h-4 w-4" />
              {t('common.pagination.previous')}
            </span>
          )}
        </li>
        {items.map((item, index) =>
          item === 'gap' ? (
            <li key={`gap-${index}`} aria-hidden="true" className="px-1 text-slate-500">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                to={buildHref(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={t('common.pagination.page', { page: item })}
                className={cx(
                  ITEM_CLASSES,
                  item === page ? 'bg-brand-600 text-white' : 'text-ink-soft hover:bg-slate-100',
                )}
              >
                {item}
              </Link>
            </li>
          ),
        )}
        <li>
          {page < totalPages ? (
            <Link to={buildHref(page + 1)} rel="next" className={cx(ITEM_CLASSES, 'text-ink-soft hover:bg-slate-100')}>
              {t('common.pagination.next')}
              <Icon name="chevron-right" className="h-4 w-4" />
            </Link>
          ) : (
            <span className={cx(ITEM_CLASSES, 'text-slate-400')} aria-disabled="true">
              {t('common.pagination.next')}
              <Icon name="chevron-right" className="h-4 w-4" />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
