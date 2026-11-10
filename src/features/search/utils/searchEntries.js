import { paths } from '@/shared/config/paths'
import { contractTypes, discussionCategories, newsCategories } from '@/shared/config/catalogs'

/** Convierte cada resultado en una entrada uniforme (enlace, título y detalle) para pintarla en cualquier lista. */
const TO_ENTRY = {
  news: (item) => ({ href: paths.newsDetail(item), title: item.title, detail: newsCategories.labelOf(item.category) }),
  jobs: (item) => ({
    href: paths.jobDetail(item),
    title: item.title,
    detail: [item.company, item.location, contractTypes.labelOf(item.contractType)].filter(Boolean).join(' · '),
  }),
  discussions: (item) => ({
    href: paths.discussionDetail(item),
    title: item.title,
    detail: [discussionCategories.labelOf(item.category), item.authorName].filter(Boolean).join(' · '),
  }),
  people: (item) => ({ href: paths.profile(item), title: item.name, detail: item.headline, person: item }),
}

export function toEntries(group, items) {
  return items.map((item) => ({ key: `${group}-${item.id}`, group, ...TO_ENTRY[group](item) }))
}
