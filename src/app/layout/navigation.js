import { paths } from '@/shared/config/paths'

export const mainNavigation = [
  { labelKey: 'common.nav.news', to: paths.news },
  { labelKey: 'common.nav.jobs', to: paths.jobs },
  { labelKey: 'common.nav.forum', to: paths.forum },
  { labelKey: 'common.nav.testimonials', to: paths.testimonials },
]

/** Enlaces del pie que no están en la navegación principal. */
export const footerExtraNavigation = [{ labelKey: 'common.nav.about', to: paths.about }]
