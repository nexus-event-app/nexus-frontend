import Button from './Button'
import { useI18n } from '@/shared/i18n/useI18n'
import Modal from './Modal'

export default function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  tone = 'danger',
  pending = false,
  onConfirm,
  onCancel,
}) {
  const { t } = useI18n()

  return (
    <Modal title={title} size="sm" onClose={onCancel} dismissible={!pending}>
      <p className="text-ink-soft">{message}</p>
      <footer className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="secondary" onClick={onCancel} disabled={pending}>
          {cancelLabel ?? t('common.dialog.cancel')}
        </Button>
        <Button variant={tone} onClick={onConfirm} loading={pending}>
          {confirmLabel ?? t('common.dialog.confirm')}
        </Button>
      </footer>
    </Modal>
  )
}
