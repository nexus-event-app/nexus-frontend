import about from './about'
import auth from './auth'
import catalogs from './catalogs'
import common from './common'
import errors from './errors'
import forum from './forum'
import home from './home'
import jobs from './jobs'
import learning from './learning'
import news from './news'
import notifications from './notifications'
import profile from './profile'
import reports from './reports'
import search from './search'
import seo from './seo'
import testimonials from './testimonials'

const modules = {
  catalogs,
  common,
  errors,
  seo,
  home,
  news,
  jobs,
  forum,
  testimonials,
  auth,
  profile,
  search,
  about,
  notifications,
  learning,
  reports,
}

/** Une los módulos: cada uno aporta sus textos en los tres idiomas bajo su propio nombre. */
function merge(language) {
  return Object.fromEntries(Object.entries(modules).map(([name, texts]) => [name, texts[language]]))
}

export default { es: merge('es'), ca: merge('ca'), en: merge('en') }
