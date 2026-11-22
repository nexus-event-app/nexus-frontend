import CheckboxField from '@/shared/components/CheckboxField'
import FormField from '@/shared/components/FormField'
import Icon from '@/shared/components/Icon'
import { useI18n } from '@/shared/i18n/useI18n'
import { DESCRIPTION_MAX } from '../utils/eventForm'

export default function EventFields({ form, minDate }) {
  const { t } = useI18n()
  const inPerson = form.values.mode === 'PRESENCIAL'

  return (
    <>
      <FormField
        {...form.getFieldProps('url')}
        className="col-span-full"
        type="url"
        inputMode="url"
        label={t('events.form.url')}
        hint={t('events.form.urlHint')}
        placeholder="https://"
        maxLength={500}
        required
      />
      <FormField
        {...form.getFieldProps('title')}
        className="col-span-full"
        label={t('events.form.title')}
        placeholder={t('events.form.titlePlaceholder')}
        maxLength={120}
        required
      />
      <FormField
        {...form.getFieldProps('date')}
        className="field-half"
        type="date"
        min={minDate}
        label={t('events.form.date')}
        required
      />
      <FormField {...form.getFieldProps('time')} className="field-half" type="time" label={t('events.form.time')} />
      <fieldset className="col-span-full">
        <legend className="mb-2 text-sm font-semibold text-ink">{t('events.form.mode')}</legend>
        <ul className="flex flex-wrap gap-2">
          {[
            ['ONLINE', 'events.form.online', 'computer'],
            ['PRESENCIAL', 'events.form.inPerson', 'pin'],
          ].map(([value, label, icon]) => (
            <li key={value}>
              <label className="flex min-h-[2.75rem] cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-4 text-sm font-medium text-ink has-[:checked]:border-accent has-[:checked]:bg-accent-soft has-[:checked]:text-accent-strong">
                <input
                  type="radio"
                  name="mode"
                  value={value}
                  checked={form.values.mode === value}
                  onChange={form.handleChange}
                  className="h-4 w-4 text-brand-600"
                />
                <Icon name={icon} className="h-4 w-4" />
                {t(label)}
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      {inPerson && (
        <>
          <FormField
            {...form.getFieldProps('city')}
            className="col-span-full"
            label={t('events.form.city')}
            hint={t('events.form.cityHint')}
            placeholder={t('events.form.cityPlaceholder')}
            maxLength={80}
            required
          />
          <FormField
            {...form.getFieldProps('address')}
            className="col-span-full"
            label={t('events.form.address')}
            placeholder={t('events.form.addressPlaceholder')}
            maxLength={200}
          />
        </>
      )}
      <FormField
        {...form.getFieldProps('description')}
        className="col-span-full"
        as="textarea"
        rows={6}
        label={t('events.form.description')}
        hint={t('events.form.descriptionHint', { count: form.values.description.length })}
        maxLength={DESCRIPTION_MAX}
        required
      />
      <p className="col-span-full rounded-2xl bg-pink-50/70 px-4 py-2 dark:bg-pink-500/10">
        <CheckboxField
          name="forWomen"
          checked={form.values.forWomen}
          onChange={form.handleChange}
          label={t('events.form.forWomen')}
          hint={t('events.form.forWomenHint')}
        />
      </p>
    </>
  )
}
