import { Navigate } from '@/shared/i18n/router'
import ArticleSkeleton from './ArticleSkeleton'
import ErrorState from './ErrorState'
import NotFound from './NotFound'
import PageMain from './PageMain'

export function detailFallback({ id, slug, request, errorTitle, canonicalPath }) {
  if (id === null || request.error?.status === 404) return <NotFound />
  if (request.error) {
    return (
      <PageMain className="page-container page-section">
        <ErrorState error={request.error} title={errorTitle} onRetry={request.reload} />
      </PageMain>
    )
  }
  if (!request.data) {
    return (
      <PageMain className="page-container page-section" loading>
        <ArticleSkeleton />
      </PageMain>
    )
  }
  const canonical = canonicalPath(request.data)
  if (slug !== request.data.slug) return <Navigate to={canonical} replace />
  return null
}
