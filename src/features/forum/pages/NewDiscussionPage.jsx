import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '@/shared/components/Breadcrumbs'
import PageHeader from '@/shared/components/PageHeader'
import Seo from '@/shared/components/Seo'
import { paths } from '@/shared/config/paths'
import { useToast } from '@/shared/hooks/useToast'
import DiscussionForm from '../components/DiscussionForm'
import ForumRules from '../components/ForumRules'
import { discussionService } from '../services/discussionService'

const INITIAL_VALUES = { title: '', content: '', category: 'AYUDA_TECNICA' }

export default function NewDiscussionPage() {
  const navigate = useNavigate()
  const toast = useToast()

  const handleSubmit = async (payload) => {
    const created = await discussionService.create(payload)
    toast.success('Tu discusión se ha publicado.')
    navigate(paths.discussionDetail(created))
  }

  return (
    <div className="page-container page-section">
      <Seo
        title="Nueva discusión"
        description="Abre una discusión en el foro de StartDev."
        path={paths.forumNew}
        robots="noindex,nofollow"
      />
      <Breadcrumbs
        items={[
          { label: 'Foro', to: paths.forum },
          { label: 'Nueva discusión', to: paths.forumNew },
        ]}
      />
      <PageHeader title="Nueva discusión" description="Cuéntanos tu duda o tema. Cuanto más claro, mejor te podremos ayudar." />
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="card min-w-0 p-5 sm:p-6">
          <DiscussionForm initialValues={INITIAL_VALUES} submitLabel="Publicar discusión" onSubmit={handleSubmit} />
        </div>
        <ForumRules />
      </div>
    </div>
  )
}
