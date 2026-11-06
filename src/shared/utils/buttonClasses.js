import { cx } from './classNames'

const VARIANT_CLASSES = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
  inverse: 'btn-inverse',
  outlineInverse: 'btn-outline-inverse',
}

export function buttonClasses({ variant = 'primary', size = 'md', className } = {}) {
  return cx('btn', VARIANT_CLASSES[variant], size === 'sm' && 'btn-sm', className)
}
