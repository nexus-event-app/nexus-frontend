import { cx } from '@/shared/utils/classNames'

export default function DataTable({ caption, columns, rows, getRowKey }) {
  return (
    <div className="md:overflow-x-auto md:rounded-card md:border md:border-slate-200 md:bg-white md:shadow-card">
      <table className="block w-full text-left text-sm md:table">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only md:not-sr-only md:table-header-group md:bg-slate-50">
          <tr className="md:table-row">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cx('px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted', column.className)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group md:divide-y md:divide-slate-200">
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              className="card mb-3 block overflow-hidden md:mb-0 md:table-row md:rounded-none md:border-0 md:shadow-none"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  data-label={column.primary || column.actions ? undefined : column.header}
                  className={cx(
                    'flex items-start justify-between gap-4 border-b border-slate-100 px-4 py-2.5 last:border-b-0 md:table-cell md:border-b-0 md:align-middle',
                    !column.primary &&
                      !column.actions &&
                      'before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-ink-muted before:content-[attr(data-label)] md:before:content-none',
                    column.primary && 'bg-slate-50 font-semibold md:bg-transparent',
                    column.className,
                  )}
                >
                  <div
                    className={cx(
                      'min-w-0',
                      column.primary ? 'text-left' : 'text-right md:text-left',
                      column.actions && 'w-full bg-slate-50/60 md:w-auto md:bg-transparent',
                    )}
                  >{column.render(row)}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
