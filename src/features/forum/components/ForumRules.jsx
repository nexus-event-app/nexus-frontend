import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'

const RULES = ['respect', 'tech', 'help', 'banned', 'practices']

export default function ForumRules() {
  const { t } = useI18n()

  return (
    <aside aria-labelledby="forum-rules-heading" className="card overflow-hidden border-brand-200">
      <div className="bg-brand-700 px-5 py-4 text-white">
        <h2 id="forum-rules-heading" className="text-lg font-bold">
          {t('forum.rules.title')}
        </h2>
      </div>
      <div className="p-5">
        <p className="text-ink-soft">
          {t('forum.rules.intro')}
        </p>
        <ul className="mt-4 space-y-4">
          {RULES.map((rule) => (
            <li key={rule} className="flex items-start gap-3">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                <Icon name="check" className="h-4 w-4" />
              </span>
              <p className="text-sm text-ink-soft">
                <strong className="font-semibold text-ink">{t(`forum.rules.${rule}Title`)}:</strong> {t(`forum.rules.${rule}Text`)}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-5 border-t border-slate-200 pt-4 text-sm font-medium text-brand-800">
          {t('forum.rules.footer')}
        </p>
      </div>
    </aside>
  )
}
