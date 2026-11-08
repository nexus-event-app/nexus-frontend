import Alert from '@/shared/components/Alert'
import Button from '@/shared/components/Button'
import FormField from '@/shared/components/FormField'
import { discussionCategories } from '@/shared/config/catalogs'
import { useForm } from '@/shared/hooks/useForm'
import { validateDiscussion } from '../utils/validators'
import { useI18n } from '@/shared/i18n/useI18n'

export default function DiscussionForm({ initialValues, submitLabel, onSubmit, onCancel }) {
  const { t } = useI18n()
  const form = useForm({
    initialValues,
    validate: validateDiscussion,
    onSubmit: ({ title, content, category }) => onSubmit({ title: title.trim(), content: content.trim(), category }),
  })

  return (
    <form onSubmit={form.handleSubmit} noValidate className="space-y-5">
      {form.formError && <Alert variant="error">{form.formError}</Alert>}
      <FormField
        {...form.getFieldProps('title')}
        label={t('forum.form.title')}
        placeholder={t('forum.form.titlePlaceholder')}
        maxLength={200}
        required
      />
      <FormField {...form.getFieldProps('category')} as="select" label={t('forum.form.category')} required>
        {discussionCategories.items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </FormField>
      <FormField
        {...form.getFieldProps('content')}
        as="textarea"
        rows={9}
        label={t('forum.form.content')}
        hint={t('forum.form.contentHint')}
        maxLength={10000}
        required
      />
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button variant="secondary" onClick={onCancel} disabled={form.submitting}>
            {t('forum.form.cancel')}
          </Button>
        )}
        <Button type="submit" loading={form.submitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
