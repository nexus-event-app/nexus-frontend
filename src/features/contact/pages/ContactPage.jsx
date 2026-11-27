import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { legalConfig } from '@/shared/config/legal'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'

const REASONS = [
  { key: 'help', icon: 'info', tone: 'from-sky-400 to-indigo-600' },
  { key: 'ideas', icon: 'sparkles', tone: 'from-amber-400 to-orange-500' },
  { key: 'community', icon: 'users', tone: 'from-emerald-400 to-cyan-500' },
  { key: 'partners', icon: 'hand', tone: 'from-pink-400 to-violet-600' },
]

function mailto(email, subject) {
  return `mailto:${email}?subject=${encodeURIComponent(`Primer Commit · ${subject}`)}`
}

export default function ContactPage() {
  const { t } = useI18n()
  const email = legalConfig.email

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo title={t('contact.seoTitle')} description={t('contact.seoDescription')} path={paths.contact} />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" />
      <Breadcrumbs items={[{ label: t('contact.breadcrumb'), to: paths.contact }]} />

      <header className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-center">
        <hgroup>
          <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-ink sm:text-6xl">
            {t('contact.titleLead')}{' '}
            <span className="bg-gradient-to-r from-brand-600 via-violet-600 to-pink-600 bg-clip-text text-transparent dark:from-brand-300 dark:via-violet-300 dark:to-pink-300">
              {t('contact.titleMark')}
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{t('contact.intro')}</p>
        </hgroup>
        {email && (
          <p className="grid justify-items-start gap-3 rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-violet-50 p-6 shadow-[0_2px_0_rgba(91,69,224,0.12),0_5px_0_rgba(91,69,224,0.08),0_26px_40px_-20px_rgba(46,36,119,0.5)] dark:border-white/10 dark:from-white/5 dark:via-white/[0.03] dark:to-white/5 sm:p-8">
            <span className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-accent">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_3px_0_#312e81]"
              >
                <Icon name="chat" className="h-5 w-5" />
              </span>
              {t('contact.emailLabel')}
            </span>
            <a
              href={`mailto:${email}`}
              className="break-all text-2xl font-bold text-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              {email}
            </a>
          </p>
        )}
      </header>

      <section aria-labelledby="contact-reasons" className="mt-20">
        <h2 id="contact-reasons" className="text-3xl font-bold tracking-tight text-ink">
          {t('contact.reasonsTitle')}
        </h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <li
              key={reason.key}
              className="group flex flex-col rounded-3xl border border-slate-200 bg-surface p-6 shadow-[0_2px_0_rgba(15,23,42,0.05),0_4px_0_rgba(15,23,42,0.04),0_18px_30px_-18px_rgba(46,36,119,0.45)] transition-shadow hover:shadow-[0_2px_0_rgba(15,23,42,0.06),0_6px_0_rgba(15,23,42,0.05),0_30px_45px_-20px_rgba(46,36,119,0.6)] dark:shadow-[0_2px_0_rgba(0,0,0,0.35),0_4px_0_rgba(0,0,0,0.3),0_18px_30px_-18px_rgba(0,0,0,0.8)]"
            >
              <span
                aria-hidden="true"
                className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-[0_3px_0_rgba(15,23,42,0.35),0_12px_18px_-8px_rgba(46,36,119,0.55)] transition-transform duration-500 [transform:perspective(500px)_rotateX(10deg)_rotateY(-14deg)] group-hover:[transform:perspective(500px)_rotateX(16deg)_rotateY(-24deg)_translateY(-3px)] ${reason.tone}`}
              >
                <Icon name={reason.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-ink">{t(`contact.reasons.${reason.key}.title`)}</h3>
              <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{t(`contact.reasons.${reason.key}.text`)}</p>
              {email && (
                <a
                  href={mailto(email, t(`contact.reasons.${reason.key}.subject`))}
                  className="mt-5 inline-flex min-h-[2.75rem] items-center gap-2 self-start font-semibold text-accent hover:underline"
                >
                  {t('contact.write')}
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span className="sr-only">: {t(`contact.reasons.${reason.key}.title`)}</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      <aside
        aria-labelledby="contact-tip"
        className="mt-16 grid gap-6 rounded-3xl border-2 border-dashed border-slate-300 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
      >
        <hgroup>
          <h2 id="contact-tip" className="text-xl font-bold text-ink">
            {t('contact.tipTitle')}
          </h2>
          <p className="mt-2 max-w-3xl leading-relaxed text-ink-muted">{t('contact.tipText')}</p>
        </hgroup>
        <ButtonLink to={paths.forum} variant="secondary" className="justify-self-start rounded-full">
          {t('contact.forum')}
        </ButtonLink>
      </aside>
    </PageMain>
  )
}
