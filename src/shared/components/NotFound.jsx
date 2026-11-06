import { Link } from 'react-router-dom'
import { paths } from '@/shared/config/paths'
import ButtonLink from './ButtonLink'
import Seo from './Seo'

const SUGGESTIONS = [
  { label: 'Últimas noticias', to: paths.news },
  { label: 'Ofertas de empleo junior', to: paths.jobs },
  { label: 'Foro de la comunidad', to: paths.forum },
  { label: 'Testimonios', to: paths.testimonials },
]

export default function NotFound() {
  return (
    <div className="page-container page-section">
      <Seo title="Página no encontrada" description="La página que buscas no existe o se ha movido." robots="noindex,nofollow" />
      <div className="mx-auto max-w-xl py-8 text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-ink">No encontramos esta página</h1>
        <p className="mt-4 text-lg text-ink-muted">
          Puede que el enlace esté roto o que el contenido ya no esté disponible. Prueba con alguna de estas secciones.
        </p>
        <ul className="mt-6 space-y-1">
          {SUGGESTIONS.map((item) => (
            <li key={item.to}>
              <Link to={item.to} className="link inline-flex min-h-[2.75rem] items-center">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ButtonLink to={paths.home} className="mt-6">
          Volver al inicio
        </ButtonLink>
      </div>
    </div>
  )
}
