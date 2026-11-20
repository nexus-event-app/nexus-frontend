import EventCard from '@/features/events/components/EventCard'
import { eventsService } from '@/features/events/services/eventsService'
import Illustration from '@/shared/components/Illustration'
import ListSkeleton from '@/shared/components/ListSkeleton'
import { illustrations } from '@/shared/config/illustrations'
import { paths } from '@/shared/config/paths'
import { useRequest } from '@/shared/hooks/useRequest'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import HomeSection from './HomeSection'

/** El próximo evento de un bloque (general o de mujeres), o una invitación a compartir uno si no hay. */
function NextEvent({ forWomen, className }) {
  const { t } = useI18n()
  const request = useRequest(`home:events:${forWomen}`, ({ signal }) =>
    eventsService.upcoming({ forWomen, page: 0, size: 1 }, { signal }),
  )
  const event = request.data?.content?.[0]

  if (request.error) return null
  if (!request.data) return <ListSkeleton rows={1} className={className} />
  if (!event) {
    return (
      <p
        className={cx(
          'flex flex-col justify-center gap-2 rounded-3xl border-2 border-dashed p-6 text-ink-muted',
          forWomen ? 'border-pink-200 dark:border-pink-400/30' : 'border-slate-300',
          className,
        )}
      >
        <strong className="text-ink">{t(forWomen ? 'home.events.emptyWomen' : 'home.events.empty')}</strong>
        <Link to={paths.eventsNew} className="link font-semibold">
          {t('events.emptyCta')}
        </Link>
      </p>
    )
  }
  return <EventCard event={event} headingLevel="h3" compact />
}

/**
 * Eventos en la portada (después del foro, como en el menú): el próximo evento para todo el mundo y el próximo de
 * comunidades de mujeres en tarjetas compactas (sin descripción), con las ilustraciones en medio. Las ilustraciones
 * solo se ven en pantallas grandes; en el móvil quedan las dos tarjetas.
 */
export default function HomeEventsSection() {
  const { t } = useI18n()
  return (
    <HomeSection
      id="home-events"
      eyebrow={t('home.events.eyebrow')}
      title={t('home.events.title')}
      description={t('home.events.description')}
      linkTo={paths.events}
      linkLabel={t('home.events.link')}
      tinted
    >
      {/*
        Las dos tarjetas a los lados y, en medio, las dos ilustraciones una encima de otra (la comunidad en el centro).
        La columna central no aporta altura (contain: size): la fila la marcan las tarjetas y cada ilustración ocupa
        media altura y se ajusta sin deformarse. En pantallas medianas, solo las dos tarjetas; en el móvil, una debajo de otra.
      */}
      <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.55fr)_minmax(0,1fr)]">
        <li className="h-full">
          <NextEvent forWomen={false} className="h-full" />
        </li>
        <li aria-hidden="true" className="hidden xl:grid xl:grid-rows-2 xl:gap-2 xl:py-4 xl:[contain:size]">
          <Illustration
            {...illustrations.events}
            className="min-h-0 [&_img]:h-full [&_img]:w-full [&_img]:object-contain"
          />
          <Illustration
            {...illustrations.women}
            className="min-h-0 [&_img]:h-full [&_img]:w-full [&_img]:object-contain"
          />
        </li>
        <li className="h-full">
          <NextEvent forWomen className="h-full" />
        </li>
      </ul>
    </HomeSection>
  )
}
