import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import SearchBar from '@/shared/components/SearchBar'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'
import { useI18n } from '@/shared/i18n/useI18n'

const SELECTS = [
  { key: 'nivel', label: 'level', catalog: jobLevels },
  { key: 'modalidad', label: 'workMode', catalog: workModes },
  { key: 'contrato', label: 'contract', catalog: contractTypes },
]

export default function JobFilters({ filters, hasFilters, onChange, onClear }) {
  const { t } = useI18n()
  return (
    <search className="mb-8 block space-y-4">
      <SearchBar
        value={filters.q}
        onSearch={(value) => onChange({ q: value }, { replace: true })}
        label={t('jobs.filters.search')}
        placeholder={t('jobs.filters.searchPlaceholder')}
      />
      <fieldset className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        <legend className="sr-only">{t('jobs.filters.legend')}</legend>
        {SELECTS.map(({ key, label, catalog }) => (
          <FormField
            key={key}
            as="select"
            name={key}
            label={t(`jobs.filters.${label}`)}
            value={filters[key]}
            onChange={(event) => onChange({ [key]: event.target.value })}
          >
            <option value="">{t('jobs.filters.all')}</option>
            {catalog.items.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </FormField>
        ))}
        {hasFilters && (
          <Button variant="secondary" onClick={onClear}>
            {t('jobs.filters.clear')}
          </Button>
        )}
      </fieldset>
    </search>
  )
}
