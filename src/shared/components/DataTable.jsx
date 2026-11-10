import { cx } from '@/shared/utils/classNames'

/**
 * Tabla de datos. En móvil cada fila se muestra como una tarjeta con el nombre de cada columna delante de su
 * valor; en pantallas medianas, como tabla. La <figure> le da el desplazamiento horizontal si no cabe.
 * Cada `render` de columna devuelve un único elemento.
 */
export default function DataTable({ caption, columns, rows, getRowKey }) {
  return (
    // Si la tabla no cabe, la <figure> se desplaza en horizontal: es enfocable para poder hacerlo con el teclado.
    <figure
      tabIndex={0}
      aria-label={caption}
      className="md:overflow-x-auto md:rounded-card md:border md:border-slate-200 md:bg-surface md:shadow-card"
    >
      <table className="block w-full text-left text-sm md:table">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only md:not-sr-only md:table-header-group md:bg-slate-50">
          <tr className="md:table-row">
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cx(
                  'px-4 py-3 text-xs font-semibold uppercase tracking-wide text-ink-muted',
                  column.className,
                )}
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
                    'flex items-start gap-4 border-b border-slate-100 px-4 py-2.5 last:border-b-0 md:table-cell md:border-b-0 md:align-middle [&>*]:min-w-0',
                    column.actions ? 'justify-end' : 'justify-between',
                    column.primary ? 'text-left' : 'text-right md:text-left',
                    column.actions && 'bg-slate-50/60 md:bg-transparent',
                    !column.primary &&
                      !column.actions &&
                      'before:text-left before:text-xs before:font-semibold before:uppercase before:tracking-wide before:text-ink-muted before:content-[attr(data-label)] md:before:content-none',
                    column.primary && 'bg-slate-50 font-semibold md:bg-transparent',
                    column.className,
                  )}
                >
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
