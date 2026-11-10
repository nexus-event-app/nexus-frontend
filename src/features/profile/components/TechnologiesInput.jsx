import { useId, useRef, useState } from 'react'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

export const MAX_TECHNOLOGIES = 12
export const MAX_TECHNOLOGY_LENGTH = 30

const SUGGESTIONS = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Vue',
  'Angular',
  'Tailwind CSS',
  'Node.js',
  'Java',
  'Spring Boot',
  'Python',
  'Django',
  'PHP',
  'Laravel',
  'C#',
  '.NET',
  'Kotlin',
  'Swift',
  'Flutter',
  'SQL',
  'PostgreSQL',
  'MySQL',
  'MongoDB',
  'Git',
  'Docker',
  'Linux',
  'AWS',
  'Figma',
  'Testing',
  'Ciberseguridad',
]

/**
 * Campo de etiquetas: se escribe una tecnología y se añade con Intro o coma. Cada etiqueta tiene su botón para
 * quitarla, y con Retroceso en el campo vacío se quita la última.
 */
export default function TechnologiesInput({ value, onChange, error }) {
  const { t } = useI18n()
  const id = useId()
  const [draft, setDraft] = useState('')
  const inputRef = useRef(null)
  const full = value.length >= MAX_TECHNOLOGIES

  const add = (raw) => {
    const technology = raw.replace(/,/g, ' ').replace(/\s+/g, ' ').trim().slice(0, MAX_TECHNOLOGY_LENGTH)
    setDraft('')
    if (!technology || full) return
    if (value.some((item) => item.toLowerCase() === technology.toLowerCase())) return
    onChange([...value, technology])
  }

  const remove = (technology) => onChange(value.filter((item) => item !== technology))

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault()
      add(draft)
    } else if (event.key === 'Backspace' && draft === '' && value.length > 0) {
      remove(value[value.length - 1])
    }
  }

  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    // Grupo de campos: la lista de tecnologías añadidas y el campo para añadir otra.
    <fieldset>
      <legend className="mb-1.5 block text-sm font-semibold text-ink">{t('profile.edit.technologies')}</legend>
      {value.length > 0 && (
        <ul className="mb-2 flex flex-wrap gap-2" aria-label={t('profile.edit.technologiesAdded')}>
          {value.map((technology) => (
            <li
              key={technology}
              className="inline-flex items-center gap-1 rounded-full bg-accent-soft py-1 pl-3 pr-1 text-sm font-semibold text-accent-strong ring-1 ring-inset ring-accent-line"
            >
              {technology}
              <button
                type="button"
                onClick={() => {
                  remove(technology)
                  inputRef.current?.focus()
                }}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-accent-tint"
                aria-label={t('profile.edit.removeTechnology', { technology })}
              >
                <Icon name="close" className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <label htmlFor={id} className="sr-only">
        {t('profile.edit.addTechnology')}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        list={`${id}-suggestions`}
        value={draft}
        onChange={(event) => {
          const next = event.target.value
          if (next.endsWith(',')) add(next)
          else setDraft(next)
        }}
        onKeyDown={handleKeyDown}
        onBlur={() => draft && add(draft)}
        disabled={full}
        maxLength={MAX_TECHNOLOGY_LENGTH}
        placeholder={full ? t('profile.edit.technologiesFull') : t('profile.edit.technologiesPlaceholder')}
        aria-describedby={[hintId, error && errorId].filter(Boolean).join(' ')}
        aria-invalid={error ? 'true' : undefined}
        className="field-input"
      />
      <datalist id={`${id}-suggestions`}>
        {SUGGESTIONS.filter((item) => !value.includes(item)).map((item) => (
          <option key={item} value={item} />
        ))}
      </datalist>
      <p id={hintId} className="mt-1.5 text-sm text-ink-muted">
        {t('profile.edit.technologiesHint', { count: value.length, max: MAX_TECHNOLOGIES })}
      </p>
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm font-medium text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </fieldset>
  )
}
