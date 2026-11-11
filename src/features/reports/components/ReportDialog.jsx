import { useId } from 'react'
import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import Modal from '@/shared/components/Modal'
import { useForm } from '@/shared/hooks/useForm'
import { useToast } from '@/shared/hooks/useToast'
import { useI18n } from '@/shared/i18n/useI18n'
import { REPORT_REASONS, reportService } from '../services/reportService'

const MAX_DETAILS = 500

/** Ventana para reportar un contenido: motivo (obligatorio) y detalles (opcional). */
export default function ReportDialog({ targetType, targetId, onClose }) {
  const { t } = useI18n()
  const toast = useToast()
  const baseId = useId()
  const reasonErrorId = `${baseId}-reason-error`

  const form = useForm({
    initialValues: { reason: '', details: '' },
    validate: ({ reason, details }) => ({
      ...(!reason && { reason: t('reports.reasonRequired') }),
      ...(details.length > MAX_DETAILS && { details: t('reports.detailsTooLong') }),
    }),
    onSubmit: async ({ reason, details }) => {
      try {
        await reportService.create({ targetType, targetId, reason, details: details.trim() || null })
        toast.success(t('reports.sent'))
      } catch (error) {
        // Ya lo había reportado: no es un error para quien lo envía.
        if (error?.status !== 409) throw error
        toast.info(t('reports.duplicate'))
      }
      onClose()
    },
  })

  return (
    <Modal title={t('reports.dialogTitle')} description={t('reports.dialogDescription')} onClose={onClose}>
      <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
        {form.formError && <Alert variant="error">{form.formError}</Alert>}
        <fieldset aria-describedby={form.errors.reason ? reasonErrorId : undefined}>
          <legend className="mb-2 text-sm font-semibold text-ink">
            {t('reports.reasonLegend')}
            <span className="text-red-700 dark:text-red-400" aria-hidden="true">
              {' '}
              *
            </span>
          </legend>
          <ul className="space-y-2">
            {REPORT_REASONS.map((reason) => (
              <li key={reason}>
                <label className="flex cursor-pointer items-start gap-3 rounded-control border border-slate-200 p-3 hover:bg-slate-50 has-[:checked]:border-accent-line has-[:checked]:bg-accent-soft">
                  <input
                    type="radio"
                    name="reason"
                    value={reason}
                    checked={form.values.reason === reason}
                    onChange={form.handleChange}
                    required
                    aria-invalid={form.errors.reason ? 'true' : undefined}
                    className="mt-1 h-4 w-4 text-brand-600"
                  />
                  <span>
                    <span className="block font-semibold text-ink">{t(`reports.reasons.${reason}.label`)}</span>
                    <span className="block text-sm text-ink-muted">{t(`reports.reasons.${reason}.hint`)}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          {form.errors.reason && (
            <strong
              id={reasonErrorId}
              role="alert"
              className="mt-2 block text-sm font-medium text-red-700 dark:text-red-400"
            >
              {form.errors.reason}
            </strong>
          )}
        </fieldset>
        <FormField
          {...form.getFieldProps('details')}
          as="textarea"
          rows={3}
          maxLength={MAX_DETAILS}
          label={t('reports.details')}
          hint={t('reports.detailsHint')}
        />
        <footer className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={onClose} disabled={form.submitting}>
            {t('common.dialog.cancel')}
          </Button>
          <Button type="submit" loading={form.submitting}>
            {form.submitting ? t('reports.submitting') : t('reports.submit')}
          </Button>
        </footer>
      </form>
    </Modal>
  )
}
