import Icon from '@/shared/components/Icon'

const RULES = [
  {
    title: 'Respeto absoluto',
    text: 'Tolerancia cero con faltas de respeto, insultos, discriminación o acoso de cualquier tipo.',
  },
  {
    title: 'Contenido tecnológico',
    text: 'Las discusiones deben estar relacionadas con desarrollo, programación, herramientas tech o experiencias profesionales en el sector.',
  },
  {
    title: 'Ayuda constructiva',
    text: 'Sé amable al dar feedback. Todos estamos aprendiendo: ofrece soluciones, no solo críticas.',
  },
  {
    title: 'Prohibido',
    text: 'Spam, autopromoción excesiva, contenido ilegal, plagio de código o compartir información confidencial de empresas.',
  },
  {
    title: 'Buenas prácticas',
    text: 'Usa títulos descriptivos, elige bien la categoría, busca antes de preguntar y comparte el código entre bloques ```.',
  },
]

export default function ForumRules() {
  return (
    <aside aria-labelledby="forum-rules-heading" className="card overflow-hidden border-brand-200">
      <div className="bg-brand-700 px-5 py-4 text-white">
        <h2 id="forum-rules-heading" className="text-lg font-bold">
          Normas de la comunidad
        </h2>
      </div>
      <div className="p-5">
        <p className="text-ink-soft">
          Este es un espacio de aprendizaje y colaboración. Para mantener un ambiente constructivo, respeta estas
          normas:
        </p>
        <ul className="mt-4 space-y-4">
          {RULES.map((rule) => (
            <li key={rule.title} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <p className="text-sm text-ink-soft">
                <strong className="font-semibold text-ink">{rule.title}:</strong> {rule.text}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-slate-200 pt-4 text-sm font-medium text-brand-800">
          Somos una comunidad de aprendizaje: tu participación ayuda a otras personas a crecer.
        </p>
      </div>
    </aside>
  )
}
