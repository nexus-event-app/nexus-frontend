import { initialsOf } from '@/shared/utils/text'

export default function Avatar({ name }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-tint text-sm font-bold text-accent-strong"
      aria-hidden="true"
    >
      {initialsOf(name)}
    </span>
  )
}
