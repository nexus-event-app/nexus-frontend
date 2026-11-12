import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { useForm } from '@/shared/hooks/useForm'
import { validateComment } from '../utils/validators'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

const INITIAL_VALUES = { content: '' }

export default function CommentForm({ onSubmit, className }) {
  const { t } = useI18n()
  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateComment,
    onSubmit: async ({ content }) => {
      await onSubmit(content.trim())
      form.reset()
    },
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className={cx('space-y-4', className)}>
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={4}
        label={t('forum.comments.label')}
        hint={t('forum.comments.hint')}
        maxLength={5000}
        required
      />
      <Button type="submit" size="lg" loading={form.submitting} className="shadow-pop">
        {form.submitting ? t('forum.comments.submitting') : t('forum.comments.submit')}
      </Button>
    </form>
  )
}
