import { Children, Fragment, isValidElement } from 'react'
import { cx } from '@/shared/utils/classNames'

function actionItems(children, prefix = '') {
  return Children.toArray(children).flatMap((child, index) =>
    isValidElement(child) && child.type === Fragment
      ? actionItems(child.props.children, `${prefix}${child.key}/`)
      : [{ key: `${prefix}${child.key ?? index}`, node: child }],
  )
}

export default function ActionMenu({ className, children }) {
  const items = actionItems(children)
  if (items.length === 0) return null
  return (
    <menu className={cx('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li key={item.key}>{item.node}</li>
      ))}
    </menu>
  )
}
