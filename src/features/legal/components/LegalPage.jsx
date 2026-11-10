import { Link } from '@/shared/i18n/router'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { legalConfig } from '@/shared/config/legal'
import { paths } from '@/shared/config/paths'

const LEGAL_LINKS = [
  { label: 'Aviso legal y condiciones de uso', to: paths.legalNotice },
  { label: 'Política de privacidad', to: paths.privacy },
  { label: 'Política de cookies', to: paths.cookies },
]

/** Plantilla común de las páginas legales: migas, título, índice y enlaces a las demás. */
export default function LegalPage({ title, description, path, sections }) {
  return (
    // Rejilla del <main>: migas arriba; índice del texto a la izquierda (pantallas grandes) y el texto legal.
    <PageMain className="page-container page-section grid grid-cols-1 content-start gap-x-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <Seo title={title} description={description} path={path} translated={false} />
      <Breadcrumbs className="col-span-full" items={[{ label: title, to: path }]} />

      <nav aria-label="En esta página" className="card hidden p-5 lg:sticky lg:top-24 lg:block lg:self-start">
        <h2 className="text-sm font-bold uppercase tracking-wide text-ink">En esta página</h2>
        <ol className="mt-3 space-y-1 text-sm">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="inline-flex min-h-[2.25rem] items-center text-ink-soft hover:text-accent hover:underline"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <article className="min-w-0 max-w-prose">
        <header>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h1>
          <p className="mt-3 text-sm text-ink-muted">Última actualización: {legalConfig.lastUpdated}</p>
        </header>

        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-title`}
            className="legal-text mt-10 scroll-mt-24 space-y-3 leading-relaxed text-ink-soft"
          >
            <h2 id={`${section.id}-title`} className="text-xl font-bold text-ink">
              {section.title}
            </h2>
            {section.content}
          </section>
        ))}

        <nav aria-label="Otros textos legales" className="mt-12 border-t border-slate-200 pt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {LEGAL_LINKS.filter((link) => link.to !== path).map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </article>
    </PageMain>
  )
}
