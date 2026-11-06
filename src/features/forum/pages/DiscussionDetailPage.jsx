import { Navigate, useParams } from 'react-router-dom'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ErrorState from '@/shared/components/ErrorState'
import JsonLd from '@/shared/components/JsonLd'
import NotFound from '@/shared/components/NotFound'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { parseIdSlug } from '@/shared/utils/slug'
import { excerpt } from '@/shared/utils/text'
import CommentsSection from '../components/CommentsSection'
import DiscussionArticle from '../components/DiscussionArticle'
import { useComments } from '../hooks/useComments'
import { useDiscussion } from '../hooks/useDiscussion'
import { buildDiscussionData } from '../utils/structuredData'

export default function DiscussionDetailPage() {
  const { idSlug } = useParams()
  const { id, slug } = parseIdSlug(idSlug)
  const request = useDiscussion(id)
  const comments = useComments(id)
  const discussion = request.data

  if (id === null || request.error?.status === 404) return <NotFound />
  if (request.error) {
    return (
      <div className="page-container page-section">
        <ErrorState error={request.error} title="No hemos podido cargar la discusión" onRetry={request.reload} />
      </div>
    )
  }
  if (!discussion) {
    return (
      <div className="page-container page-section">
        <ArticleSkeleton />
      </div>
    )
  }
  if (slug !== discussion.slug) return <Navigate to={paths.discussionDetail(discussion)} replace />

  const path = paths.discussionDetail(discussion)

  return (
    <div className="page-container page-section">
      <Seo
        title={discussion.title}
        description={excerpt(discussion.content, 160)}
        path={path}
        type="article"
        publishedTime={discussion.createdAt}
        modifiedTime={discussion.updatedAt}
      />
      <JsonLd data={buildDiscussionData(discussion, comments.data)} />
      <Breadcrumbs
        items={[
          { label: 'Foro', to: paths.forum },
          { label: excerpt(discussion.title, 60), to: path },
        ]}
      />
      <div className="mx-auto max-w-3xl">
        <DiscussionArticle
          discussion={discussion}
          commentCount={comments.data?.length ?? discussion.commentCount}
          onChange={(updated) => request.mutate(() => updated)}
        />
        <CommentsSection discussionId={discussion.id} comments={comments} />
      </div>
    </div>
  )
}
