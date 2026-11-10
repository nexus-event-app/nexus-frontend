import { useState } from 'react'
import ActionMenu from '@/shared/components/ActionMenu'
import { Link } from 'react-router-dom'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import Modal from '@/shared/components/Modal'
import PageHeader from '@/shared/components/PageHeader'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { jobLevels, workModes } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useToast } from '@/shared/hooks/useToast'
import { isExpired, postedAt } from '@/features/jobs/utils/jobHelpers'
import JobForm from '../components/JobForm'
import PagedTable from '../components/PagedTable'
import StatusBadge from '../components/StatusBadge'
import { useAdminList } from '../hooks/useAdminList'
import { adminJobsService } from '../services/adminJobsService'

export default function AdminJobsPage() {
  const toast = useToast()
  const list = useAdminList('jobs', adminJobsService.list)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)

  const [removeJob, removing] = useAction(
    async (job) => {
      await adminJobsService.remove(job.id)
      setDeleting(null)
      list.reload()
    },
    { successMessage: 'Oferta borrada.' },
  )

  const handleSubmit = async (payload) => {
    if (editing === 'new') {
      await adminJobsService.create(payload)
      toast.success('Oferta creada.')
    } else {
      await adminJobsService.update(editing.id, payload)
      toast.success('Oferta actualizada.')
    }
    setEditing(null)
    list.reload()
  }

  const columns = [
    {
      key: 'title',
      header: 'Oferta',
      primary: true,
      render: (job) => (
        <p>
          {job.title}
          <span className="block mt-1 text-sm font-normal text-ink-muted">
            {job.company}
            {job.imported && <> · importada de {job.source}</>}
          </span>
        </p>
      ),
    },
    {
      key: 'kind',
      header: 'Nivel y modalidad',
      render: (job) => (
        <p className="flex flex-wrap justify-end gap-1.5 md:justify-start">
          <Badge tone={jobLevels.toneOf(job.level)}>{jobLevels.labelOf(job.level)}</Badge>
          <Badge tone={workModes.toneOf(job.workMode)}>{workModes.labelOf(job.workMode)}</Badge>
        </p>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (job) => (isExpired(job) ? <Badge tone="amber">Caducada</Badge> : <StatusBadge active={job.isActive} />),
    },
    { key: 'date', header: 'Publicada', render: (job) => <Time value={postedAt(job)} format="short" /> },
    {
      key: 'actions',
      actions: true,
      header: 'Acciones',
      render: (job) => (
        <ActionMenu className="justify-end md:justify-start">
          {job.isActive && !isExpired(job) && (
            <Link to={paths.jobDetail(job)} className="btn btn-ghost btn-sm">
              Ver<span className="sr-only"> {job.title}</span>
            </Link>
          )}
          <Button variant="secondary" size="sm" onClick={() => setEditing(job)}>
            <Icon name="pencil" className="h-4 w-4" />
            Editar<span className="sr-only"> {job.title}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleting(job)}>
            <Icon name="trash" className="h-4 w-4" />
            Borrar<span className="sr-only"> {job.title}</span>
          </Button>
        </ActionMenu>
      ),
    },
  ]

  return (
    <>
      <Seo title="Administrar empleo" path={paths.adminJobs} robots="noindex,nofollow" />
      <PageHeader
        title="Ofertas de empleo"
        description="Publica y mantén al día las oportunidades para perfiles junior."
        actions={
          <Button onClick={() => setEditing('new')}>
            <Icon name="plus" />
            Nueva oferta
          </Button>
        }
      />
      <PagedTable
        list={list}
        columns={columns}
        caption="Listado de ofertas de empleo"
        emptyIcon="briefcase"
        emptyTitle="Todavía no hay ofertas"
        emptyDescription="Crea la primera oferta con el botón «Nueva oferta»."
      />

      {editing && (
        <Modal title={editing === 'new' ? 'Nueva oferta' : 'Editar oferta'} size="lg" onClose={() => setEditing(null)}>
          <JobForm job={editing === 'new' ? null : editing} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Borrar oferta"
          message={`¿Seguro que quieres borrar «${deleting.title}»? Esta acción no se puede deshacer.`}
          confirmLabel="Borrar oferta"
          pending={removing}
          onConfirm={() => removeJob(deleting)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  )
}
