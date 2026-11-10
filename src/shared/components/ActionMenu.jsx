import { Children, Fragment, isValidElement } from 'react'
import { cx } from '@/shared/utils/classNames'

/**
 * Separa las acciones (aunque vengan en fragmentos o con condiciones) para darle a cada una su <li>. La clave de cada
 * acción incluye la de su fragmento, para que no se repitan claves entre fragmentos distintos.
 */
function actionItems(children, prefix = '') {
  return Children.toArray(children).flatMap((child, index) =>
    isValidElement(child) && child.type === Fragment
      ? actionItems(child.props.children, `${prefix}${child.key}/`)
      : [{ key: `${prefix}${child.key ?? index}`, node: child }],
  )
}

/** Grupo de acciones (botones o enlaces) como menú: <menu> con un <li> por acción. */
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
