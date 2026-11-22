import EventFields from '@/features/events/components/EventFields'
import { toEventFormValues, toEventPayload, validateEvent } from '@/features/events/utils/eventForm'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import Modal from '@/shared/components/Modal'
import { useForm } from '@/shared/hooks/useForm'
import { useToast } from '@/shared/hooks/useToast'
import { adminEventsService } from '../services/adminEventsService'

export default function EventEditDialog({ event, onSaved, onClose }) {
  const toast = useToast()
  const form = useForm({
    initialValues: toEventFormValues(event),
    validate: (values) => validateEvent(values, null),
    onSubmit: async (values) => {
      const saved = await adminEventsService.update(event.id, toEventPayload(values))
      toast.success('Evento corregido.')
      onSaved(saved)
    },
  })

  return (
    <Modal title="Editar evento" onClose={onClose} dismissible={!form.submitting}>
      <form onSubmit={form.handleSubmit} noValidate className="form-grid">
        {form.formError && (
          <Alert variant="error" className="col-span-full">
            {form.formError}
          </Alert>
        )}
        <EventFields form={form} />
        <footer className="col-span-full flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={form.submitting}>
            Cancelar
          </Button>
          <Button type="submit" loading={form.submitting}>
            Guardar cambios
          </Button>
        </footer>
      </form>
    </Modal>
  )
}
