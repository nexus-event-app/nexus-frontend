import FilterLinks from '@/shared/components/FilterLinks'
import { useI18n } from '@/shared/i18n/useI18n'

/** Filtro por idioma de las noticias: todas, solo en castellano o solo en inglés. */
export default function NewsLanguageFilter({ language, buildHref, className }) {
  const { t } = useI18n()
  const options = ['', 'es', 'en'].map((value) => ({
    key: value || 'all',
    label: t(`news.languageFilter.${value || 'all'}`),
    href: buildHref(1, { idioma: value }),
    active: language === value,
  }))
  return (
    <FilterLinks label={t('news.languageFilter.label')} options={options} variant="segmented" className={className} />
  )
}
