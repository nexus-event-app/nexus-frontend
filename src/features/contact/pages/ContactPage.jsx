import { useState } from 'react'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import ButtonLink from '@/shared/components/ButtonLink'
import Eyebrow from '@/shared/components/Eyebrow'
import Icon from '@/shared/components/Icon'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { legalConfig } from '@/shared/config/legal'
import { paths } from '@/shared/config/paths'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'
import ContactForm from '../components/ContactForm'
import { CONTACT_REASONS } from '../config/reasons'

const CARD =
  'rounded-3xl border bg-surface shadow-[0_2px_0_rgba(15,23,42,0.05),0_4px_0_rgba(15,23,42,0.04),0_18px_30px_-18px_rgba(46,36,119,0.45)] dark:shadow-[0_2px_0_rgba(0,0,0,0.35),0_4px_0_rgba(0,0,0,0.3),0_18px_30px_-18px_rgba(0,0,0,0.8)]'

export default function ContactPage() {
  const { t } = useI18n()
  const [reason, setReason] = useState('')
  const email = legalConfig.email

  const choose = (value) => {
    setReason(value)
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <PageMain className="page-container page-section relative isolate">
      <Seo title={t('contact.seoTitle')} description={t('contact.seoDescription')} path={paths.contact} />
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem]" />
      <Breadcrumbs items={[{ label: t('contact.breadcrumb'), to: paths.contact }]} />

      <hgroup className="mt-8 max-w-3xl">
        <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">{t('contact.title')}</h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-muted">{t('contact.intro')}</p>
      </hgroup>

      <section aria-labelledby="contact-reasons" className="mt-14">
        <h2 id="contact-reasons" className="text-2xl font-bold tracking-tight text-ink">
          {t('contact.reasonsTitle')}
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONTACT_REASONS.map((item) => {
            const selected = reason === item.value
            return (
              <li
                key={item.value}
                className={cx(
                  'group flex flex-col p-6 transition-shadow',
                  CARD,
                  selected ? 'border-accent-line ring-2 ring-accent/40' : 'border-slate-200',
                )}
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-[0_3px_0_#3730a3,0_6px_0_#312e81,0_14px_20px_-8px_rgba(49,46,129,0.6)] transition-transform duration-500 [transform:perspective(500px)_rotateX(10deg)_rotateY(-14deg)] group-hover:[transform:perspective(500px)_rotateX(16deg)_rotateY(-24deg)_translateY(-3px)]"
                >
                  <Icon name={item.icon} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{t(`contact.reasons.${item.key}.title`)}</h3>
                <p className="mt-2 flex-1 leading-relaxed text-ink-soft">{t(`contact.reasons.${item.key}.text`)}</p>
                <button
                  type="button"
                  onClick={() => choose(item.value)}
                  aria-pressed={selected}
                  className="mt-5 inline-flex min-h-[2.75rem] items-center gap-2 self-start font-semibold text-accent hover:underline"
                >
                  {t('contact.write')}
                  <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  <span className="sr-only">: {t(`contact.reasons.${item.key}.title`)}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      <section
        aria-labelledby="contact-form"
        className="mt-16 grid scroll-mt-28 gap-10 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start"
      >
        <article className={cx('border-slate-200 p-6 sm:p-8', CARD)}>
          <h2 id="contact-form" className="mb-6 scroll-mt-28 text-2xl font-bold tracking-tight text-ink">
            {t('contact.formTitle')}
          </h2>
          <ContactForm reason={reason} onReasonChange={setReason} />
        </article>
        <aside
          aria-labelledby="contact-tip"
          className="grid gap-6 rounded-3xl border-2 border-dashed border-slate-300 p-6 sm:p-8"
        >
          <hgroup>
            <h2 id="contact-tip" className="text-xl font-bold text-ink">
              {t('contact.tipTitle')}
            </h2>
            <p className="mt-2 leading-relaxed text-ink-muted">{t('contact.tipText')}</p>
          </hgroup>
          <ButtonLink to={paths.forum} variant="secondary" className="justify-self-start rounded-full">
            {t('contact.forum')}
          </ButtonLink>
          {email && (
            <p className="border-t border-slate-200 pt-5 text-sm text-ink-muted">
              {t('contact.orEmail')}{' '}
              <a href={`mailto:${email}`} className="link break-all font-semibold">
                {email}
              </a>
            </p>
          )}
        </aside>
      </section>
    </PageMain>
  )
}
