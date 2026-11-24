import { useId } from 'react'
import { useRequest } from '@/shared/hooks/useRequest'
import FilterLinks from '@/shared/components/FilterLinks'
import Icon from '@/shared/components/Icon'
import SearchBar from '@/shared/components/SearchBar'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { useI18n } from '@/shared/i18n/useI18n'
import { jobsService } from '../services/jobsService'

function SelectFilter({ label, name, value, onChange, emptyLabel, options }) {
  const id = useId()
  return (
    <p className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange({ [name]: event.target.value })}
        className="block min-h-[2.75rem] w-full appearance-none truncate rounded-full border border-slate-200 bg-surface py-2 pl-4 pr-9 text-sm text-ink shadow-sm transition-colors hover:border-slate-300 focus:border-accent-line"
      >
        <option value="">{emptyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Icon
        name="chevron-down"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
      />
    </p>
  )
}

export default function JobFilters({ filters, onChange, buildHref }) {
  const { t } = useI18n()
  const cities = useRequest('jobs:cities', ({ signal }) => jobsService.cities({ signal }))
  const cityNames = [...new Set([...(cities.data ?? []), ...(filters.ciudad ? [filters.ciudad] : [])])]

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
    <search className="mb-8 grid grid-cols-1 items-center gap-3 border-y border-slate-200 py-3 sm:grid-cols-2 xl:grid-cols-[auto_11rem_11rem_minmax(0,1fr)]">
      <FilterLinks label={t('jobs.filters.levelNav')} options={levelOptions} className="col-span-full" />
      <FilterLinks
        label={t('jobs.filters.workModeNav')}
        options={modeOptions}
        variant="segmented"
        className="sm:col-span-full xl:col-span-1"
      />
      <SelectFilter
        label={t('jobs.filters.contract')}
        name="contrato"
        value={filters.contrato}
        onChange={onChange}
        emptyLabel={t('jobs.filters.anyContract')}
        options={contractTypes.items.map((item) => ({ value: item.slug, label: item.label }))}
      />
      <SelectFilter
        label={t('jobs.filters.city')}
        name="ciudad"
        value={filters.ciudad}
        onChange={onChange}
        emptyLabel={t('jobs.filters.anyCity')}
        options={cityNames.map((city) => ({ value: city, label: city }))}
      />
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
