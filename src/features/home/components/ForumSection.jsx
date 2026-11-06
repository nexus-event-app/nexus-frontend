import DiscussionCard from '@/features/forum/components/DiscussionCard'
import { useLatestDiscussions } from '@/features/forum/hooks/useLatestDiscussions'
import ButtonLink from '@/shared/components/ButtonLink'
import EmptyState from '@/shared/components/EmptyState'
import ListSkeleton from '@/shared/components/ListSkeleton'
import QueryBoundary from '@/shared/components/QueryBoundary'
import { paths } from '@/shared/config/paths'
import HomeSection from './HomeSection'

export default function ForumSection() {
  const request = useLatestDiscussions(3)

  return (
    <HomeSection
      id="home-forum"
      title="El foro de la comunidad"
      description="Dudas técnicas, recursos y experiencias. Aquí todas las preguntas son bienvenidas."
      linkTo={paths.forum}
      linkLabel="Ir al foro"
    >
      <QueryBoundary
        data={request.data}
        error={request.error}
        onRetry={request.reload}
        skeleton={<ListSkeleton rows={3} />}
        errorTitle="No hemos podido cargar el foro"
      >
        {(items) =>
          items.length === 0 ? (
            <EmptyState
              icon="chat"
              title="El foro está esperando su primera discusión"
              description="Abre un tema y empieza la conversación."
              action={<ButtonLink to={paths.forumNew}>Crear una discusión</ButtonLink>}
            />
          ) : (
            <ul className="grid gap-4 lg:grid-cols-3">
              {items.map((discussion) => (
                <li key={discussion.id}>
                  <DiscussionCard discussion={discussion} />
                </li>
              ))}
            </ul>
          )
        }
      </QueryBoundary>
    </HomeSection>
  )
}
