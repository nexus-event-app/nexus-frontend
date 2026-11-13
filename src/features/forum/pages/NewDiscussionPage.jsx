import { useNavigate } from '@/shared/i18n/useNavigate'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import Eyebrow from '@/shared/components/Eyebrow'
import PageMain from '@/shared/components/PageMain'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import DiscussionForm from '../components/DiscussionForm'
import ForumRules from '../components/ForumRules'
import { discussionService } from '../services/discussionService'
import { siteConfig } from '@/shared/config/site'
import { useI18n } from '@/shared/i18n/useI18n'

const INITIAL_VALUES = { title: '', content: '', category: 'AYUDA_TECNICA' }

export default function NewDiscussionPage() {
  const { t } = useI18n()
  const navigate = useNavigate()
  const { user } = useAuth()
  const toast = useToast()

  const handleSubmit = async (payload) => {
    const created = await discussionService.create(payload)
    toast.success(t('forum.new.published'))
    navigate(paths.discussionDetail(created))
  }

  return (
    // Como «Editar perfil»: cabecera arriba; a la izquierda, el formulario; a la derecha, las normas del foro. Las normas
    // ocupan dos filas y son más largas: la última fila se lleva el sobrante para que el formulario no se separe del título.
    <PageMain className="page-container page-section relative isolate grid grid-cols-1 content-start gap-x-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:grid-rows-[auto_auto_auto_1fr]">
      <span aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-96" />
      <Seo
        title={t('forum.new.seoTitle')}
        description={t('forum.new.seoDescription', { name: siteConfig.name })}
        path={paths.forumNew}
        robots="noindex,nofollow"
      />
      <Breadcrumbs
        className="col-span-full"
        items={[
          { label: t('forum.breadcrumb'), to: paths.forum },
          { label: t('forum.new.seoTitle'), to: paths.forumNew },
        ]}
      />
      <hgroup className="col-span-full mt-6 max-w-3xl">
        <Eyebrow>{t('forum.new.eyebrow')}</Eyebrow>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{t('forum.new.seoTitle')}</h1>
        <p className="mt-3 text-lg text-ink-muted">{t('forum.new.description')}</p>
      </hgroup>
      {user?.emailVerified === false ? (
        <VerifyEmailNotice className="mt-10 min-w-0 self-start lg:col-start-1 lg:row-start-3">
          {t('forum.new.confirmEmail')}
        </VerifyEmailNotice>
      ) : (
        <>
          <hgroup className="mt-10 lg:col-start-1 lg:row-start-3">
            <Eyebrow>{t('forum.new.formEyebrow')}</Eyebrow>
            <h2 id="new-discussion-form" className="mt-3 text-2xl font-bold tracking-tight text-ink">
              {t('forum.new.formTitle')}
            </h2>
          </hgroup>
          <DiscussionForm
            aria-labelledby="new-discussion-form"
            className="mt-5 min-w-0 self-start rounded-3xl border border-slate-200 bg-surface p-5 shadow-card sm:p-8 lg:col-start-1 lg:row-start-4"
            initialValues={INITIAL_VALUES}
            submitLabel={t('forum.new.submit')}
            buttonSize="lg"
            onSubmit={handleSubmit}
          />
        </>
      )}
      <ForumRules className="mt-14 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-3 lg:mt-10 lg:self-start" />
    </PageMain>
  )
}
