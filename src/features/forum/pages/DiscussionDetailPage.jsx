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
    // Rejilla del <main>: migas, la pregunta y las respuestas a la izquierda; a la derecha, la ilustración del foro y
    // debajo las normas, que acompañan al bajar. En el móvil, todo en una columna (sin ilustración).
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
      {/* Cuadrícula decorativa detrás de la cabecera, como en el listado del foro. */}
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
      {/*
        Columna derecha: la ilustración y las normas ocupan toda la altura (las tres filas), las normas bajadas lo que
        mide la ilustración; así pueden quedarse pegadas (sticky) mientras se leen las respuestas. La última fila (1fr)
        es la que crece, para que la tarjeta de la pregunta no se estire.
      */}
      <Illustration
        {...illustrations.forum}
        className="hidden lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:block lg:self-start"
      />
      <ForumRules className="mt-12 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-60 lg:self-start xl:mt-64" />
    </PageMain>
  )
}
