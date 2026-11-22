import { useParams } from 'react-router-dom'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ErrorState from '@/shared/components/ErrorState'
import JsonLd from '@/shared/components/JsonLd'
import { detailFallback } from '@/shared/components/DetailFallback'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { parseIdSlug } from '@/shared/utils/slug'
import { excerpt } from '@/shared/utils/text'
import Illustration from '@/shared/components/Illustration'
import { illustrations } from '@/shared/config/illustrations'
import CommentsSection from '../components/CommentsSection'
import ForumRules from '../components/ForumRules'
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

  const fallback = detailFallback({
    id,
    slug,
    request: request,
    errorTitle: t('forum.detail.error'),
    canonicalPath: paths.discussionDetail,
  })
  if (fallback) return fallback

  const path = paths.discussionDetail(discussion)

  return (
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:grid-rows-[auto_auto_1fr] xl:grid-cols-[minmax(0,1fr)_22rem]">
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
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Breadcrumbs
        className="lg:col-start-1"
        items={[
          { label: t('forum.breadcrumb'), to: paths.forum },
          { label: excerpt(discussion.title, 60), to: path },
        ]}
      />
      <DiscussionArticle
        className="mt-6 lg:col-start-1"
        discussion={discussion}
        commentCount={comments.data?.length ?? discussion.commentCount}
        onChange={(updated) => request.mutate(() => updated)}
      />
      <CommentsSection
        className="lg:col-start-1"
        discussion={discussion}
        comments={comments}
        onDiscussionChange={(updated) => request.mutate(() => updated)}
      />
      <Illustration
        {...illustrations.forum}
        className="hidden lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:block lg:self-start"
      />
      <ForumRules className="mt-12 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-60 lg:self-start xl:mt-64" />
    </PageMain>
  )
}
