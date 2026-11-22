import Eyebrow from '@/shared/components/Eyebrow'
import Illustration from '@/shared/components/Illustration'
import { illustrations } from '@/shared/config/illustrations'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

const PHASES = [
  { id: 'call', icon: 'chat' },
  { id: 'test', icon: 'code' },
  { id: 'team', icon: 'users' },
]

const LIVE_TIPS = [
  { id: 'thinkAloud', icon: 'chat' },
  { id: 'ask', icon: 'info' },
  { id: 'simple', icon: 'sparkles' },
  { id: 'examples', icon: 'beaker' },
  { id: 'stuck', icon: 'flag' },
  { id: 'unknown', icon: 'heart' },
]

const QUESTION_GROUPS = [
  { id: 'role', questions: ['role1', 'role2'] },
  { id: 'team', questions: ['teamQ1', 'teamQ2'] },
  { id: 'growth', questions: ['growth1', 'growth2'] },
]

function Phase({ phase, n }) {
  const { t } = useI18n()
  const key = (name) => t(`jobs.interview.${phase.id}${name}`)
  return (
    <article
      aria-labelledby={`interview-${phase.id}`}
      className="flex h-full flex-col rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-8"
    >
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent"
        >
          <Icon name={phase.icon} className="h-5 w-5" />
        </span>
        <hgroup>
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {t('jobs.interview.step', { n })}
          </p>
          <h4 id={`interview-${phase.id}`} className="text-xl font-bold text-ink">
            {key('Title')}
          </h4>
        </hgroup>
      </header>
      <p className="mt-4 leading-relaxed text-ink-soft">{key('Text')}</p>
      <p className="mt-6 text-sm font-semibold text-ink">{t('jobs.interview.prepare')}</p>
      <ul className="mt-3 space-y-3">
        {[1, 2, 3].map((i) => (
          <li key={i} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 text-sm leading-relaxed text-ink-soft">
            <Icon name="check" className="mt-0.5 h-4 w-4 text-accent" />
            {key(i)}
          </li>
        ))}
      </ul>
    </article>
  )
}

export default function InterviewPrep() {
  const { t } = useI18n()

  return (
    <section aria-labelledby="interview-prep" className="relative mt-20 grid gap-x-8 gap-y-12 lg:grid-cols-2">
      <hgroup className="col-span-full max-w-2xl">
        <Eyebrow>{t('jobs.interview.eyebrow')}</Eyebrow>
        <h2 id="interview-prep" className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {t('jobs.interview.title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-muted">{t('jobs.interview.description')}</p>
      </hgroup>

      <Illustration
        {...illustrations.interview}
        className="absolute -top-4 right-6 hidden w-64 lg:block xl:right-12 xl:w-72"
      />

      <section aria-labelledby="interview-phases" className="col-span-full -mt-2">
        <hgroup className="max-w-3xl">
          <h3 id="interview-phases" className="text-2xl font-bold tracking-tight text-ink">
            {t('jobs.interview.phasesTitle')}
          </h3>
          <p className="mt-2 text-ink-muted">{t('jobs.interview.phasesNote')}</p>
        </hgroup>
        <ol className="mt-6 grid gap-5 lg:grid-cols-3">
          {PHASES.map((phase, index) => (
            <li key={phase.id}>
              <Phase phase={phase} n={index + 1} />
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="interview-live" className="flex flex-col">
        <hgroup>
          <h3 id="interview-live" className="text-2xl font-bold tracking-tight text-ink">
            {t('jobs.interview.liveTitle')}
          </h3>
          <p className="mt-2 text-ink-muted">{t('jobs.interview.liveIntro')}</p>
        </hgroup>
        <ul className="mt-6 grid gap-x-6 gap-y-6 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:grid-cols-2 sm:p-8">
          {LIVE_TIPS.map((tip) => (
            <li key={tip.id} className="grid grid-cols-[auto_minmax(0,1fr)] gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft text-accent"
              >
                <Icon name={tip.icon} className="h-4 w-4" />
              </span>
              <p className="text-sm leading-relaxed text-ink-soft">
                <strong className="block text-base font-semibold text-ink">{t(`jobs.interview.${tip.id}Title`)}</strong>
                {t(`jobs.interview.${tip.id}Text`)}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="interview-questions" className="flex flex-col">
        <hgroup>
          <h3 id="interview-questions" className="text-2xl font-bold tracking-tight text-ink">
            {t('jobs.interview.questionsTitle')}
          </h3>
          <p className="mt-2 text-ink-muted">{t('jobs.interview.questionsIntro')}</p>
        </hgroup>
        <ul className="mt-6 grid flex-1 content-start gap-6 rounded-3xl border border-slate-200 bg-surface p-6 shadow-card sm:p-8">
          {QUESTION_GROUPS.map((group) => (
            <li key={group.id}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-accent">
                {t(`jobs.interview.${group.id}Group`)}
              </h4>
              <ul className="mt-3 grid gap-2">
                {group.questions.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-3 rounded-2xl bg-canvas px-4 py-3 text-sm leading-relaxed text-ink"
                  >
                    <Icon name="chat" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {t(`jobs.interview.${q}`)}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <Icon name="flag" className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {t('jobs.interview.closing')}
        </p>
      </section>
    </section>
  )
}
