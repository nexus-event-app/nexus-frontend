import { cx } from '@/shared/utils/classNames'

const FENCE = /```[^\n]*\n([\s\S]*?)```/g

function splitBlocks(text) {
  const blocks = []
  let cursor = 0
  for (const match of text.matchAll(FENCE)) {
    if (match.index > cursor) blocks.push({ type: 'text', value: text.slice(cursor, match.index) })
    blocks.push({ type: 'code', value: match[1].replace(/\n$/, '') })
    cursor = match.index + match[0].length
  }
  if (cursor < text.length) blocks.push({ type: 'text', value: text.slice(cursor) })
  return blocks.filter((block) => block.type === 'code' || block.value.trim())
}

/**
 * Texto escrito por la comunidad: párrafos y bloques de código (entre ```), sin contenedor alrededor.
 * `className` se aplica a cada bloque; la separación entre bloques la pone .user-text (index.css). `lang`, si se
 * indica, marca el idioma de cada párrafo (por ejemplo, una noticia en inglés).
 */
export default function UserText({ children, className, lang }) {
  return splitBlocks(children ?? '').map((block, index) =>
    block.type === 'code' ? (
      <pre
        key={index}
        className={cx(
          'user-text user-code overflow-x-auto rounded-control bg-gray-900 p-4 leading-relaxed text-gray-100 dark:ring-1 dark:ring-white/10',
          className,
        )}
      >
        <code className="font-mono">{block.value}</code>
      </pre>
    ) : (
      <p key={index} lang={lang} className={cx('user-text whitespace-pre-wrap break-words', className)}>
        {block.value.trim()}
      </p>
    ),
  )
}
