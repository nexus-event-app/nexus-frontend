import { useNavigate } from '@/shared/i18n/useNavigate'
import VerifyEmailNotice from '@/features/auth/components/VerifyEmailNotice'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import PageHeader from '@/shared/components/PageHeader'
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
    <div className="page-container page-section">
      <Seo
        title={t('forum.new.seoTitle')}
        description={t('forum.new.seoDescription', { name: siteConfig.name })}
        path={paths.forumNew}
        robots="noindex,nofollow"
      />
      <Breadcrumbs
        items={[
          { label: t('forum.breadcrumb'), to: paths.forum },
          { label: t('forum.new.seoTitle'), to: paths.forumNew },
        ]}
      />
      <PageHeader title={t('forum.new.seoTitle')} description={t('forum.new.description')} />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        {user?.emailVerified === false ? (
          <div className="min-w-0">
            <VerifyEmailNotice>{t('forum.new.confirmEmail')}</VerifyEmailNotice>
          </div>
        ) : (
          <div className="card min-w-0 p-5 sm:p-6">
            <DiscussionForm initialValues={INITIAL_VALUES} submitLabel={t('forum.new.submit')} onSubmit={handleSubmit} />
          </div>
        )}
        <ForumRules />
      </div>
    </div>
  )
}
