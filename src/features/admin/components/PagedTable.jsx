import DataTable from '@/shared/components/DataTable'
import EmptyState from '@/shared/components/EmptyState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import Pagination from '@/shared/components/Pagination'
import QueryBoundary from '@/shared/components/QueryBoundary'

export default function PagedTable({ list, columns, caption, emptyTitle, emptyDescription, emptyIcon = 'document' }) {
  return (
    <section aria-label={caption} aria-busy={list.loading}>
      <QueryBoundary data={list.data} error={list.error} onRetry={list.reload} skeleton={<ListSkeleton />}>
        {(result) =>
          result.content.length === 0 ? (
            <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} />
          ) : (
            <>
              <p role="status" className="mb-3 text-sm text-ink-muted">
                {result.totalElements} {result.totalElements === 1 ? 'resultado' : 'resultados'}
              </p>
              <DataTable caption={caption} columns={columns} rows={result.content} getRowKey={(row) => row.id} />
              <Pagination page={list.page} totalPages={result.totalPages} buildHref={list.buildHref} />
            </>
          )
        }
      </QueryBoundary>
    </section>
  )
}
