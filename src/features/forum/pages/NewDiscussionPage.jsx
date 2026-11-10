import { useNavigate } from '@/shared/i18n/useNavigate'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import PageHeader from '@/shared/components/PageHeader'
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
    <PageMain className="page-container page-section grid grid-cols-1 content-start gap-x-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
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
      <PageHeader className="col-span-full" title={t('forum.new.seoTitle')} description={t('forum.new.description')} />
      {user?.emailVerified === false ? (
        <VerifyEmailNotice className="min-w-0 self-start">{t('forum.new.confirmEmail')}</VerifyEmailNotice>
      ) : (
        <DiscussionForm
          className="card min-w-0 self-start p-5 sm:p-6"
          initialValues={INITIAL_VALUES}
          submitLabel={t('forum.new.submit')}
          onSubmit={handleSubmit}
        />
      )}
      <ForumRules className="mt-10 lg:mt-0" />
    </PageMain>
  )
}
