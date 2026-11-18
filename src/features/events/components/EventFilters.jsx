import FilterLinks from '@/shared/components/FilterLinks'
import Icon from '@/shared/components/Icon'
import { useRequest } from '@/shared/hooks/useRequest'
import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { eventsService } from '../services/eventsService'

function localDate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/**
 * Filtros de la agenda: modalidad (online o presencial), ciudad (solo las que tienen eventos) y, si se eligió un día en
 * el calendario, una etiqueta para quitarlo. Elegir ciudad implica presencial.
 */
export default function EventFilters({ id, filters, modeSlug, hrefWith, onCityChange, className }) {
  const { t, locale } = useI18n()
  const cities = useRequest('events:cities', ({ signal }) => eventsService.cities({ signal }))
  const cityOptions = cities.data ?? []
  const options = [
    { key: 'all', label: t('events.filter.all'), href: hrefWith({ modalidad: '' }), active: !modeSlug },
    {
      key: 'online',
      label: t('events.filter.online'),
      // Online y ciudad no casan: al elegir online se quita la ciudad.
      href: hrefWith({ modalidad: 'online', ciudad: '' }),
      active: modeSlug === 'online',
    },
    {
      key: 'presencial',
      label: t('events.filter.inPerson'),
      href: hrefWith({ modalidad: 'presencial' }),
      active: modeSlug === 'presencial',
    },
  ]

  return (
    <search
      id={id}
      className={`flex scroll-mt-24 flex-wrap items-center gap-x-6 gap-y-3 border-y border-slate-200 py-4 ${className ?? ''}`}
    >
      <FilterLinks label={t('events.filter.label')} options={options} />
      <p className="flex items-center gap-2">
        <label htmlFor="events-city" className="text-sm font-medium text-ink-soft">
          <Icon name="pin" className="mr-1 inline h-4 w-4" />
          {t('events.filter.city')}
        </label>
        <select
          id="events-city"
          value={filters.city}
          onChange={(event) => onCityChange(event.target.value)}
          className="field-input min-h-[2.75rem] w-auto rounded-full py-2 pl-4 pr-10 text-sm sm:min-h-[2.25rem]"
        >
          <option value="">{t('events.filter.allCities')}</option>
          {/* La elegida se queda en la lista aunque ya no tenga eventos, para poder quitarla. */}
          {[...new Set([...cityOptions, ...(filters.city ? [filters.city] : [])])].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </p>
      {filters.day && (
        <p className="flex items-center">
          <Link
            to={hrefWith({ dia: '' })}
            className="inline-flex min-h-[2.75rem] items-center gap-2 rounded-full bg-brand-600 px-4 text-sm font-semibold text-white shadow-card hover:bg-brand-700 sm:min-h-[2.25rem]"
            aria-label={t('events.filter.clearDay', {
              date: new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long' }).format(localDate(filters.day)),
            })}
          >
            <Icon name="calendar" className="h-4 w-4" />
            {new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short' }).format(
              localDate(filters.day),
            )}
            <Icon name="close" className="h-4 w-4" />
          </Link>
        </p>
      )}
    </search>
  )
}
