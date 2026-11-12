import { paths } from '@/shared/config/paths'

export const mainNavigation = [
  { labelKey: 'common.nav.news', to: paths.news },
  { labelKey: 'common.nav.jobs', to: paths.jobs },
  { labelKey: 'common.nav.forum', to: paths.forum },
  // Mismo orden que los apartados de la portada: rutas y después testimonios.
  { labelKey: 'common.nav.learning', to: paths.learning },
  { labelKey: 'common.nav.testimonials', to: paths.testimonials },
  { labelKey: 'common.nav.about', to: paths.about },
]
