import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'

const BENEFITS = [
  { key: 'benefitProgress', icon: 'academic' },
  { key: 'benefitJobs', icon: 'bookmark' },
  { key: 'benefitForum', icon: 'chat' },
  { key: 'benefitAlerts', icon: 'bell' },
]

/**
 * Cierre de la portada para quien aún no tiene cuenta: lo que se gana al unirse y el botón para crearla. Va al final,
 * después de los testimonios, porque habla de toda la web (no solo de las rutas). Es la propia franja morada: sus
 * márgenes la dejan en la misma columna que el resto de apartados (como .page-container, pero sin envoltorio).
 */
export default function HomeJoinSection() {
  const { t } = useI18n()
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return null

  return (
    <section
      aria-labelledby="home-join"
      className="relative isolate mx-4 mb-14 grid items-center gap-6 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 p-6 text-white shadow-pop sm:mx-6 sm:p-8 lg:mx-8 lg:grid-cols-[auto_minmax(0,1fr)_auto] xl:mx-auto xl:max-w-[76rem] 3xl:max-w-[96rem]"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-16 -z-10 h-48 w-48 rounded-full bg-white/10"
      />
      <hgroup>
        <h2 id="home-join" className="text-2xl font-bold">
          {t('home.paths.joinTitle')}
        </h2>
        <p className="mt-1 text-brand-100">{t('home.paths.joinText')}</p>
      </hgroup>
      <ul className="grid gap-x-6 gap-y-2 text-sm font-medium sm:grid-cols-2">
        {BENEFITS.map((benefit) => (
          <li key={benefit.key} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20"
            >
              <Icon name={benefit.icon} className="h-4 w-4" />
            </span>
            {t(`home.paths.${benefit.key}`)}
          </li>
        ))}
      </ul>
      <ButtonLink
        to={paths.register}
        variant="inverse"
        className="justify-self-start rounded-full px-6 transition-all hover:-translate-y-0.5 lg:justify-self-end"
      >
        {t('home.paths.join')}
      </ButtonLink>
    </section>
  )
}
