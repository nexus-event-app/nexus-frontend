import { initialsOf } from '@/shared/utils/text'

export default function Avatar({ name }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800"
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  )
}
