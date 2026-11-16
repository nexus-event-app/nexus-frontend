import FormField from '@/shared/components/FormField'
import { useI18n } from '@/shared/i18n/useI18n'
import { BIO_MAX } from '../utils/profileForm'
import { normalizeGithub, normalizeLinkedin } from '../utils/profileLinks'
import TechnologiesInput from './TechnologiesInput'

const LEGEND = 'float-left mb-4 w-full text-lg font-bold text-ink'

/**
 * Los campos del perfil (lo básico, tecnologías y enlaces), en grupos con su título. Los usan «Editar perfil» y el
 * panel de administración, con el mismo `form` de useForm. Las leyendas flotan para comportarse como un título más
 * y no cortar el borde del grupo.
 */
export default function ProfileFields({ form, firstClassName = '' }) {
  const { t } = useI18n()
  const technologiesError = Object.entries(form.errors).find(([key]) => key.startsWith('technologies'))?.[1]
  const bioLength = form.values.bio.trim().length

  return (
    <>
      <fieldset className={`space-y-6 [&>legend+*]:clear-left ${firstClassName}`}>
        <legend className={LEGEND}>{t('profile.edit.basics')}</legend>
        <FormField
          {...form.getFieldProps('name')}
          label={t('profile.edit.name')}
          hint={t('profile.edit.nameHint')}
          autoComplete="name"
          maxLength={50}
          required
        />
        <FormField
          {...form.getFieldProps('headline')}
          label={t('profile.edit.headline')}
          placeholder={t('profile.edit.headlinePlaceholder')}
          maxLength={80}
        />
        <FormField
          {...form.getFieldProps('bio')}
          as="textarea"
          rows={4}
          label={t('profile.edit.bio')}
          placeholder={t('profile.edit.bioPlaceholder')}
          hint={t('profile.edit.bioHint', { count: bioLength, max: BIO_MAX })}
          maxLength={BIO_MAX}
        />
      </fieldset>
      <TechnologiesInput
        className="border-t border-slate-200 pt-8 [&>legend+*]:clear-left"
        legendClassName={LEGEND}
        value={form.values.technologies}
        onChange={(next) => form.setValue('technologies', next)}
        error={technologiesError}
      />
      <fieldset className="space-y-6 border-t border-slate-200 pt-8 [&>legend+*]:clear-left">
        <legend className={LEGEND}>{t('profile.edit.links')}</legend>
        <p className="!mt-0 text-sm text-ink-muted">{t('profile.edit.linksHint')}</p>
        <FormField
          {...form.getFieldProps('githubUrl')}
          type="url"
          inputMode="url"
          autoComplete="url"
          label="GitHub"
          placeholder="https://github.com/tu-usuario"
          onBlur={(event) => form.setValue('githubUrl', normalizeGithub(event.target.value))}
          maxLength={200}
        />
        <FormField
          {...form.getFieldProps('linkedinUrl')}
          type="url"
          inputMode="url"
          label="LinkedIn"
          placeholder="https://www.linkedin.com/in/tu-usuario"
          onBlur={(event) => form.setValue('linkedinUrl', normalizeLinkedin(event.target.value))}
          maxLength={200}
        />
      </fieldset>
    </>
  )
}
