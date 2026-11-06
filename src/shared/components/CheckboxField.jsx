export default function CheckboxField({ label, name, checked, onChange, hint }) {
  return (
    <label className="flex min-h-[2.75rem] cursor-pointer items-start gap-3 py-1">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-1 h-5 w-5 rounded border-slate-400 text-brand-600"
      />
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        {hint && <span className="block text-sm text-ink-muted">{hint}</span>}
      </span>
    </label>
  )
}
