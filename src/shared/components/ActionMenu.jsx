import { Children, Fragment, isValidElement } from 'react'
import { cx } from '@/shared/utils/classNames'

/** Separa las acciones (aunque vengan en fragmentos o con condiciones) para darle a cada una su <li>. */
function actionItems(children) {
  return Children.toArray(children).flatMap((child) =>
    isValidElement(child) && child.type === Fragment ? actionItems(child.props.children) : [child],
  )
}

/** Grupo de acciones (botones o enlaces) como menú: <menu> con un <li> por acción. */
export default function ActionMenu({ className, children }) {
  const items = actionItems(children)
  if (items.length === 0) return null
  return (
    <menu className={cx('flex flex-wrap gap-2', className)}>
      {items.map((item, index) => (
        <li key={item.key ?? index}>{item}</li>
      ))}
    </menu>
  )
}
