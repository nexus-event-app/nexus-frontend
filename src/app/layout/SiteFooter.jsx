import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Logo from '@/shared/components/Logo'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'
import { mainNavigation } from './navigation'

const LEGAL_LINKS = [
  { label: 'Aviso legal y condiciones', to: paths.legalNotice },
  { label: 'Privacidad', to: paths.privacy },
  { label: 'Cookies', to: paths.cookies },
]

const LINK_CLASSES = 'inline-flex min-h-[2.75rem] items-center text-ink-soft hover:text-brand-700 hover:underline sm:min-h-0 sm:py-1'

export default function SiteFooter() {
  const { isAuthenticated } = useAuth()

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="page-container grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-4 max-w-sm text-ink-muted">
            {siteConfig.tagline}. Noticias, ofertas de empleo, foro y testimonios en español para quienes dan sus
            primeros pasos en tecnología.
          </p>
        </div>

        <nav aria-label="Pie de página: explorar">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink">Explorar</h2>
          <ul className="mt-3">
            {mainNavigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={LINK_CLASSES}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Pie de página: cuenta">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink">Tu cuenta</h2>
          <ul className="mt-3">
            {isAuthenticated ? (
              <li>
                <Link to={paths.forumNew} className={LINK_CLASSES}>
                  Crear una discusión
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to={paths.login} className={LINK_CLASSES}>
                    Iniciar sesión
                  </Link>
                </li>
                <li>
                  <Link to={paths.register} className={LINK_CLASSES}>
                    Crear cuenta
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <nav aria-label="Pie de página: legal">
          <h2 className="text-sm font-bold uppercase tracking-wide text-ink">Legal</h2>
          <ul className="mt-3">
            {LEGAL_LINKS.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={LINK_CLASSES}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-200">
        <p className="page-container py-5 text-center text-sm text-ink-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Hecho para la comunidad tech junior en español.
        </p>
      </div>
    </footer>
  )
}
