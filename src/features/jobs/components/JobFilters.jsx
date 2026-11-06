import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import SearchBar from '@/shared/components/SearchBar'
import { contractTypes, jobLevels, workModes } from '@/shared/config/catalogs'

const SELECTS = [
  { key: 'nivel', label: 'Nivel', catalog: jobLevels },
  { key: 'modalidad', label: 'Modalidad', catalog: workModes },
  { key: 'contrato', label: 'Tipo de contrato', catalog: contractTypes },
]

export default function JobFilters({ filters, hasFilters, onChange, onClear }) {
  return (
    <div className="mb-8 space-y-4">
      <SearchBar
        value={filters.q}
        onSearch={(value) => onChange({ q: value }, { replace: true })}
        label="Buscar ofertas"
        placeholder="Puesto, empresa o tecnología…"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
        {SELECTS.map(({ key, label, catalog }) => (
          <FormField
            key={key}
            as="select"
            name={key}
            label={label}
            value={filters[key]}
            onChange={(event) => onChange({ [key]: event.target.value })}
          >
            <option value="">Todos</option>
            {catalog.items.map((item) => (
              <option key={item.slug} value={item.slug}>
                {item.label}
              </option>
            ))}
          </FormField>
        ))}
        {hasFilters && (
          <Button variant="secondary" onClick={onClear}>
            Quitar filtros
          </Button>
        )}
      </div>
    </div>
  )
}
