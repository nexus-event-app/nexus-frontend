import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Alert from '@/shared/components/Alert'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useForm } from '@/shared/hooks/useForm'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { useNavigate } from '@/shared/i18n/useNavigate'
import { eventsService } from '../services/eventsService'
import EventFields from '../components/EventFields'
import { INITIAL_EVENT, toEventPayload, todayIso, validateEvent } from '../utils/eventForm'

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
      <EventFields form={form} minDate={today} />
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
