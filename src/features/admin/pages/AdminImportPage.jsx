import { useState } from 'react'
import ActionMenu from '@/shared/components/ActionMenu'
import Alert from '@/shared/components/Alert'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import DataTable from '@/shared/components/DataTable'
import EmptyState from '@/shared/components/EmptyState'
import Icon from '@/shared/components/Icon'
import ListSkeleton from '@/shared/components/ListSkeleton'
import Modal from '@/shared/components/Modal'
import PageHeader from '@/shared/components/PageHeader'
import QueryBoundary from '@/shared/components/QueryBoundary'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { importSourceTypes } from '@/shared/config/catalogs'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import { useRequest } from '@/shared/hooks/useRequest'
import { useToast } from '@/shared/hooks/useToast'
import { cx } from '@/shared/utils/classNames'
import { hostnameOf } from '@/shared/utils/url'
import ImportSourceForm from '../components/ImportSourceForm'
import StatusBadge from '../components/StatusBadge'
import { adminImportService } from '../services/adminImportService'

function formatInterval(minutes) {
  if (minutes % 1440 === 0) return minutes === 1440 ? 'cada día' : `cada ${minutes / 1440} días`
  if (minutes % 60 === 0) return minutes === 60 ? 'cada hora' : `cada ${minutes / 60} h`
  return `cada ${minutes} min`
}

function LastRun({ source }) {
  if (!source.lastRunAt) return <span className="text-sm text-ink-muted">Pendiente de la primera ejecución</span>
  const failed = source.lastStatus === 'FAILED'
  return (
    <p className="text-sm">
      <span className="flex flex-wrap items-center justify-end gap-2 md:justify-start">
        <Badge tone={failed ? 'red' : 'green'}>{failed ? 'Error' : 'Correcta'}</Badge>
        <Time value={source.lastRunAt} format="short" className="text-ink-muted" />
      </span>
      {source.lastMessage && (
        <span className={cx('mt-1 block', failed ? 'text-red-700 dark:text-red-400' : 'text-ink-muted')}>
          {source.lastMessage}
        </span>
      )}
    </p>
  )
}

export default function AdminImportPage() {
  const toast = useToast()
  const request = useRequest('admin:import-sources', ({ signal }) => adminImportService.list({ signal }))
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [runningId, setRunningId] = useState(null)

  const replaceSource = (updated) =>
    request.mutate((items) => items.map((item) => (item.id === updated.id ? updated : item)))

  const [runSource] = useAction(async (source) => {
    setRunningId(source.id)
    try {
      const result = await adminImportService.run(source.id)
      replaceSource(result.source)
      if (result.status === 'FAILED') toast.error(`${source.name}: ${result.message}`)
      else toast.success(`${source.name}: ${result.message}`)
    } finally {
      setRunningId(null)
    }
  })

  const [toggleSource] = useAction(async (source) => {
    const {
      name,
      type,
      url,
      newsCategory,
      keywords,
      excludeKeywords,
      intervalMinutes,
      autoPublish,
      remoteOnly,
      useSourceImages,
      active,
    } = source
    const payload = {
      name,
      type,
      url,
      newsCategory,
      keywords,
      excludeKeywords,
      intervalMinutes,
      autoPublish,
      remoteOnly,
      useSourceImages,
      active: !active,
    }
    replaceSource(await adminImportService.update(source.id, payload))
  })

  const [addDefaults, addingDefaults] = useAction(async () => {
    const created = await adminImportService.addDefaults()
    if (created.length === 0) {
      toast.info('Ya tienes todas las fuentes recomendadas.')
      return
    }
    request.mutate((items) => [...items, ...created].sort((a, b) => a.name.localeCompare(b.name, 'es')))
    toast.success(
      created.length === 1
        ? `Añadida: ${created[0].name}.`
        : `Añadidas ${created.length} fuentes: ${created.map((s) => s.name).join(', ')}.`,
    )
  })

  const [removeSource, removing] = useAction(
    async (source) => {
      await adminImportService.remove(source.id)
      request.mutate((items) => items.filter((item) => item.id !== source.id))
      setDeleting(null)
    },
    { successMessage: 'Fuente borrada.' },
  )

  const handleSubmit = async (payload) => {
    if (editing === 'new') {
      const created = await adminImportService.create(payload)
      request.mutate((items) => [...items, created].sort((a, b) => a.name.localeCompare(b.name, 'es')))
      toast.success('Fuente creada. Se consultará en la próxima revisión automática.')
    } else {
      replaceSource(await adminImportService.update(editing.id, payload))
      toast.success('Fuente actualizada.')
    }
    setEditing(null)
  }

  const columns = [
    {
      key: 'name',
      header: 'Fuente',
      primary: true,
      render: (source) => (
        <p>
          {source.name}
          <span className="block mt-1 text-sm font-normal text-ink-muted">
            {importSourceTypes.labelOf(source.type)} · {hostnameOf(source.url)}
          </span>
        </p>
      ),
    },
    {
      key: 'config',
      header: 'Configuración',
      render: (source) => (
        <p className="flex flex-wrap justify-end gap-1.5 md:justify-start">
          <StatusBadge active={source.active} inactiveLabel="Pausada" />
          {!source.autoPublish && <Badge tone="amber">Revisión manual</Badge>}
          {source.remoteOnly && <Badge tone="blue">Solo remoto</Badge>}
          {source.keywords && <Badge tone="indigo">Con palabras clave</Badge>}
          {source.excludeKeywords && <Badge tone="indigo">Con exclusiones</Badge>}
          {source.useSourceImages === false && <Badge tone="violet">Fotos propias</Badge>}
          <Badge>{formatInterval(source.intervalMinutes)}</Badge>
        </p>
      ),
    },
    { key: 'lastRun', header: 'Última ejecución', render: (source) => <LastRun source={source} /> },
    {
      key: 'actions',
      actions: true,
      header: 'Acciones',
      render: (source) => (
        <ActionMenu className="justify-end md:justify-start">
          <Button
            variant="secondary"
            size="sm"
            loading={runningId === source.id}
            disabled={runningId !== null && runningId !== source.id}
            onClick={() => runSource(source)}
          >
            <Icon name="refresh" className="h-4 w-4" />
            Importar ahora<span className="sr-only"> {source.name}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setEditing(source)}>
            <Icon name="pencil" className="h-4 w-4" />
            Editar<span className="sr-only"> {source.name}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => toggleSource(source)}>
            {source.active ? 'Pausar' : 'Activar'}
            <span className="sr-only"> {source.name}</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setDeleting(source)}>
            <Icon name="trash" className="h-4 w-4" />
            Borrar<span className="sr-only"> {source.name}</span>
          </Button>
        </ActionMenu>
      ),
    },
  ]

  return (
    <>
      <Seo title="Importación automática" path={paths.adminImport} robots="noindex,nofollow" />
      <PageHeader
        title="Importación automática"
        description="Fuentes externas de noticias y ofertas de empleo que se consultan periódicamente."
        actions={
          <>
            <Button variant="secondary" loading={addingDefaults} onClick={() => addDefaults()}>
              Añadir fuentes recomendadas
            </Button>
            <Button onClick={() => setEditing('new')}>
              <Icon name="plus" />
              Nueva fuente
            </Button>
          </>
        }
      />

      <Alert variant="info" className="mb-6" title="Cómo funciona">
        De cada noticia se guarda un resumen con enlace al artículo original, y las ofertas enlazan a la fuente para
        inscribirse. Solo se importan ofertas de prácticas o junior del sector tech. Lo importado no se indexa en
        buscadores, para no competir con el contenido original. Si borras algo importado, no vuelve a importarse.
      </Alert>

      <section aria-label="Fuentes de importación" aria-busy={request.loading}>
        <QueryBoundary data={request.data} error={request.error} onRetry={request.reload} skeleton={<ListSkeleton />}>
          {(sources) =>
            sources.length === 0 ? (
              <EmptyState
                icon="refresh"
                title="No hay fuentes configuradas"
                description="Añade un feed de noticias o una fuente de empleo con el botón «Nueva fuente»."
              />
            ) : (
              <DataTable
                caption="Fuentes de importación"
                columns={columns}
                rows={sources}
                getRowKey={(source) => source.id}
              />
            )
          }
        </QueryBoundary>
      </section>

      {editing && (
        <Modal title={editing === 'new' ? 'Nueva fuente' : 'Editar fuente'} size="lg" onClose={() => setEditing(null)}>
          <ImportSourceForm
            source={editing === 'new' ? null : editing}
            onSubmit={handleSubmit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}

      {deleting && (
        <ConfirmDialog
          title="Borrar fuente"
          message={`¿Seguro que quieres borrar «${deleting.name}»? Lo ya importado se conserva.`}
          confirmLabel="Borrar fuente"
          pending={removing}
          onConfirm={() => removeSource(deleting)}
          onCancel={() => setDeleting(null)}
        />
      )}
    </>
  )
}
