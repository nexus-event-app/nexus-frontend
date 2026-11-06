import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { siteConfig } from '@/shared/config/site'

const HIGHLIGHTS = [
  { icon: 'newspaper', title: 'Noticias sin ruido', text: 'Lo que pasa en tech, explicado para quien empieza.' },
  { icon: 'briefcase', title: 'Empleo junior', text: 'Ofertas y prácticas pensadas para tu primer paso.' },
  { icon: 'chat', title: 'Foro activo', text: 'Pregunta sin miedo y aprende con la comunidad.' },
]

export default function HeroSection() {
  const { isAuthenticated } = useAuth()

  return (
    <section aria-labelledby="hero-heading" className="bg-gradient-to-br from-brand-700 via-brand-800 to-brand-950 text-white">
      <div className="page-container grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-200">Comunidad tech en español</p>
          <h1 id="hero-heading" className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Tu primer paso en tecnología no tiene que darse en solitario
          </h1>
          <p className="mt-5 max-w-xl text-lg text-brand-100">
            {siteConfig.name} reúne noticias, ofertas de empleo junior, un foro activo y testimonios reales para quienes
            empiezan su carrera como developers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {isAuthenticated ? (
              <ButtonLink to={paths.forum} variant="inverse">
                Ir al foro
              </ButtonLink>
            ) : (
              <ButtonLink to={paths.register} variant="inverse">
                Crear cuenta gratis
              </ButtonLink>
            )}
            <ButtonLink to={paths.jobs} variant="outlineInverse">
              Ver ofertas de empleo
            </ButtonLink>
          </div>
        </div>

        <ul className="grid gap-4">
          {HIGHLIGHTS.map((item) => (
            <li key={item.title} className="flex items-start gap-4 rounded-card bg-white/10 p-5 ring-1 ring-white/20">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-control bg-white/15">
                <Icon name={item.icon} className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p className="mt-1 text-brand-100">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
