import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Alert from '@/shared/components/Alert'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import CheckboxField from '@/shared/components/CheckboxField'
import Eyebrow from '@/shared/components/Eyebrow'
import FormField from '@/shared/components/FormField'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { eventsService } from '../services/eventsService'
import { DESCRIPTION_MAX, INITIAL_EVENT, toEventPayload, todayIso, validateEvent } from '../utils/eventForm'

/** Consejos para que la agenda sea útil, al lado del formulario. */
function SharingTips({ className }) {
  const { t } = useI18n()
  return (
    <aside aria-labelledby="event-tips" className={className}>
      <hgroup>
        <Eyebrow>{t('events.new.tipsEyebrow')}</Eyebrow>
        <h2 id="event-tips" className="mt-3 text-xl font-bold tracking-tight text-ink">
          {t('events.new.tipsTitle')}
        </h2>
      </hgroup>
      <ul className="mt-5 space-y-4 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card">
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-ink-soft">
            <Icon name="check" className="mt-0.5 h-5 w-5 text-accent" />
            {t(`events.new.tip${n}`)}
          </li>
        ))}
      </ul>
    </aside>
  )
}

function EventForm({ onSubmit }) {
  const { t } = useI18n()
  const today = todayIso()
  const form = useForm({
    initialValues: INITIAL_EVENT,
    validate: (values) => validateEvent(values, today),
    onSubmit: (values) => onSubmit(toEventPayload(values)),
  })
  const inPerson = form.values.mode === 'PRESENCIAL'

  return (
    <form
      onSubmit={form.handleSubmit}
      noValidate
      aria-labelledby="new-event-form"
      className="form-grid mt-5 rounded-3xl border border-slate-200 bg-surface p-5 shadow-card sm:p-8 lg:col-start-1 lg:row-start-4"
    >
      {form.formError && (
        <Alert variant="error" className="col-span-full">
          {form.formError}
        </Alert>
      )}
      <FormField
        {...form.getFieldProps('url')}
        className="col-span-full"
        type="url"
        inputMode="url"
        label={t('events.form.url')}
        hint={t('events.form.urlHint')}
        placeholder="https://"
        maxLength={500}
        required
      />
      <FormField
        {...form.getFieldProps('title')}
        className="col-span-full"
        label={t('events.form.title')}
        placeholder={t('events.form.titlePlaceholder')}
        maxLength={120}
        required
      />
      <FormField
        {...form.getFieldProps('date')}
        className="field-half"
        type="date"
        min={today}
        label={t('events.form.date')}
        required
      />
      <FormField {...form.getFieldProps('time')} className="field-half" type="time" label={t('events.form.time')} />
      <fieldset className="col-span-full">
        <legend className="mb-2 text-sm font-semibold text-ink">{t('events.form.mode')}</legend>
        <ul className="flex flex-wrap gap-2">
          {[
            ['ONLINE', 'events.form.online', 'computer'],
            ['PRESENCIAL', 'events.form.inPerson', 'pin'],
          ].map(([value, label, icon]) => (
            <li key={value}>
              <label className="flex min-h-[2.75rem] cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-medium text-ink has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent-strong">
                <input
                  type="radio"
                  name="mode"
                  value={value}
                  checked={form.values.mode === value}
                  onChange={form.handleChange}
                  className="h-4 w-4 text-brand-600"
                />
                <Icon name={icon} className="h-4 w-4" />
                {t(label)}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      {inPerson && (
        <FormField
          {...form.getFieldProps('city')}
          className="col-span-full"
          label={t('events.form.city')}
          maxLength={80}
          required
        />
      )}
      <FormField
        {...form.getFieldProps('description')}
        className="col-span-full"
        as="textarea"
        rows={3}
        label={t('events.form.description')}
        hint={t('events.form.descriptionHint', { count: form.values.description.length })}
        maxLength={DESCRIPTION_MAX}
        required
      />
      <p className="col-span-full rounded-2xl bg-pink-50/70 px-4 py-2 dark:bg-pink-500/10">
        <CheckboxField
          name="forWomen"
          checked={form.values.forWomen}
          onChange={form.handleChange}
          label={t('events.form.forWomen')}
          hint={t('events.form.forWomenHint')}
        />
      </p>
      <footer className="col-span-full flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">
        <ButtonLink to={paths.events} variant="secondary" size="lg">
          {t('events.new.cancel')}
        </ButtonLink>
        <Button type="submit" size="lg" className="shadow-pop" loading={form.submitting}>
          {t('events.new.submit')}
        </Button>
      </footer>
    </form>
  )
}

/** Compartir un evento: formulario corto a la izquierda y consejos a la derecha, como «Nueva discusión». */
export default function NewEventPage() {
  const { t } = useI18n()
  const { user } = useAuth()
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (payload) => {
    await eventsService.create(payload)
    toast.success(t('events.new.published'))
    navigate(paths.events)
  }

  return (
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_auto_auto_1fr]">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Seo title={t('events.new.seoTitle')} path={paths.eventsNew} robots="noindex,nofollow" />
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('events.breadcrumb'), to: paths.events },
          { label: t('events.new.seoTitle'), to: paths.eventsNew },
        ]}
      />
      <hgroup className="col-span-full mt-6 max-w-3xl">
        <Eyebrow>{t('events.new.eyebrow')}</Eyebrow>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t('events.new.seoTitle')}</h1>
        <p className="mt-3 text-lg text-ink-muted">{t('events.new.description')}</p>
      </hgroup>
      {user?.emailVerified === false ? (
        <VerifyEmailNotice className="mt-10 min-w-0 self-start lg:col-start-1 lg:row-start-3">
          {t('events.new.confirmEmail')}
        </VerifyEmailNotice>
      ) : (
        <>
          <hgroup className="mt-10 lg:col-start-1 lg:row-start-3">
            <Eyebrow>{t('events.new.formEyebrow')}</Eyebrow>
            <h2 id="new-event-form" className="mt-3 text-2xl font-bold tracking-tight text-ink">
              {t('events.new.formTitle')}
            </h2>
          </hgroup>
          <EventForm onSubmit={handleSubmit} />
        </>
      )}
      <SharingTips className="mt-14 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-3 lg:mt-10 lg:self-start" />
    </PageMain>
  )
}
