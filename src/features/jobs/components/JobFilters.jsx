import { useId } from 'react'
import FilterLinks from '@/shared/components/FilterLinks'
import Icon from '@/shared/components/Icon'
import SearchBar from '@/shared/components/SearchBar'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { useI18n } from '@/shared/i18n/useI18n'

/**
 * Barra de filtros discreta, como la de Noticias: nivel en fichas, modalidad en un control segmentado, el tipo de
 * contrato en un desplegable pequeño y el buscador en forma de pastilla. Todo en una fila en pantallas muy anchas; en las
 * demás, el nivel arriba, después modalidad y contrato, y el buscador debajo.
 */
export default function JobFilters({ filters, onChange, buildHref }) {
  const { t } = useI18n()
  const contractId = useId()

  const levelOptions = [
    { key: 'all', label: t('jobs.filters.all'), href: buildHref(1, { nivel: '' }), active: !filters.nivel },
    ...jobLevels.items.map((item) => ({
      key: item.slug,
      label: item.label,
      href: buildHref(1, { nivel: item.slug }),
      active: filters.nivel === item.slug,
    })),
  ]
  const modeOptions = [
    {
      key: 'all',
      label: t('jobs.filters.allModes'),
      href: buildHref(1, { modalidad: '' }),
      active: !filters.modalidad,
    },
    ...workModes.items.map((item) => ({
      key: item.slug,
      label: item.label,
      href: buildHref(1, { modalidad: item.slug }),
      active: filters.modalidad === item.slug,
    })),
  ]

  return (
    <search className="mb-8 grid grid-cols-1 items-center gap-3 border-y border-slate-200 py-3 sm:grid-cols-[auto_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_auto_11rem_17rem]">
      <FilterLinks
        label={t('jobs.filters.levelNav')}
        options={levelOptions}
        className="sm:col-span-full xl:col-span-1"
      />
      <FilterLinks label={t('jobs.filters.workModeNav')} options={modeOptions} variant="segmented" />
      <p className="relative">
        <label htmlFor={contractId} className="sr-only">
          {t('jobs.filters.contract')}
        </label>
        <select
          id={contractId}
          name="contrato"
          value={filters.contrato}
          onChange={(event) => onChange({ contrato: event.target.value })}
          className="block min-h-[2.75rem] w-full appearance-none rounded-full border border-slate-200 bg-surface py-2 pl-4 pr-9 text-sm text-ink shadow-sm transition-colors hover:border-slate-300 focus:border-accent-line"
        >
          <option value="">{t('jobs.filters.anyContract')}</option>
          {contractTypes.items.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.label}
            </option>
          ))}
        </select>
        <Icon
          name="chevron-down"
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
        />
      </p>
      <SearchBar
        compact
        className="sm:col-span-full xl:col-span-1"
        value={filters.q}
        onSearch={(value) => onChange({ q: value }, { replace: true })}
        label={t('jobs.filters.search')}
        placeholder={t('jobs.filters.searchPlaceholder')}
      />
    </search>
  )
}
