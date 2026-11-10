import { useParams } from 'react-router-dom'
import { Navigate } from '@/shared/i18n/router'
import ArticleSkeleton from '@/shared/components/ArticleSkeleton'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ErrorState from '@/shared/components/ErrorState'
import JsonLd from '@/shared/components/JsonLd'
import NotFound from '@/shared/components/NotFound'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { parseIdSlug } from '@/shared/utils/slug'
import { excerpt } from '@/shared/utils/text'
import CommentsSection from '../components/CommentsSection'
import DiscussionArticle from '../components/DiscussionArticle'
import { useComments } from '../hooks/useComments'
import { useDiscussion } from '../hooks/useDiscussion'
import { buildDiscussionData } from '../utils/structuredData'
import { useI18n } from '@/shared/i18n/useI18n'

export default function DiscussionDetailPage() {
  const { t } = useI18n()
  const { idSlug } = useParams()
  const { id, slug } = parseIdSlug(idSlug)
  const request = useDiscussion(id)
  const comments = useComments(id)
  const discussion = request.data

  if (id === null || request.error?.status === 404) return <NotFound />
  if (request.error) {
    return (
      <PageMain className="page-container page-section">
        <ErrorState error={request.error} title={t('forum.detail.error')} onRetry={request.reload} />
      </PageMain>
    )
  }
  if (!discussion) {
    return (
      <PageMain className="page-container page-section" loading>
        <ArticleSkeleton />
      </PageMain>
    )
  }
  if (slug !== discussion.slug) return <Navigate to={paths.discussionDetail(discussion)} replace />

  const path = paths.discussionDetail(discussion)

  return (
    <PageMain className="page-container page-section">
      <Seo
        title={discussion.title}
        description={excerpt(discussion.content, 160)}
        path={path}
        type="article"
        publishedTime={discussion.createdAt}
        modifiedTime={discussion.updatedAt}
        translated={false}
      />
      <JsonLd data={buildDiscussionData(discussion, comments.data)} />
      <Breadcrumbs
        items={[
          { label: t('forum.breadcrumb'), to: paths.forum },
          { label: excerpt(discussion.title, 60), to: path },
        ]}
      />
      <DiscussionArticle
        className="mx-auto max-w-3xl"
        discussion={discussion}
        commentCount={comments.data?.length ?? discussion.commentCount}
        onChange={(updated) => request.mutate(() => updated)}
      />
      <CommentsSection className="mx-auto max-w-3xl" discussionId={discussion.id} comments={comments} />
    </PageMain>
  )
}
