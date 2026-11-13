import { cx } from '@/shared/utils/classNames'

const FENCE = /```[^\n]*\n([\s\S]*?)```/g

/** Una viñeta sola en su línea y su texto más abajo (así llegaban algunas listas importadas): se juntan. */
const LONELY_BULLET = /•[ \t]*\n+[ \t]*(?=\S)/g
const BULLET = /^•\s+/

function splitBlocks(text) {
  const blocks = []
  let cursor = 0
  for (const match of text.matchAll(FENCE)) {
    if (match.index > cursor) blocks.push(...splitText(text.slice(cursor, match.index)))
    blocks.push({ type: 'code', value: match[1].replace(/\n$/, '') })
    cursor = match.index + match[0].length
  }
  if (cursor < text.length) blocks.push(...splitText(text.slice(cursor)))
  return blocks.filter((block) => block.type !== 'text' || block.value.trim())
}

/** Separa el texto en párrafos y listas: las líneas seguidas que empiezan por «•» forman una lista. */
function splitText(text) {
  const blocks = []
  let paragraph = []
  let items = []
  const flushParagraph = () => {
    if (paragraph.length) blocks.push({ type: 'text', value: paragraph.join('\n') })
    paragraph = []
  }
  const flushList = () => {
    if (items.length) blocks.push({ type: 'list', items })
    items = []
  }
  const lines = text.replace(LONELY_BULLET, '• ').split('\n')
  lines.forEach((line, index) => {
    if (BULLET.test(line.trim())) {
      flushParagraph()
      items.push(line.trim().replace(BULLET, ''))
    } else if (items.length && !line.trim()) {
      // Una línea en blanco entre dos puntos no corta la lista; si después viene otra cosa, sí.
      const next = lines.slice(index + 1).find((candidate) => candidate.trim())
      if (!next || !BULLET.test(next.trim())) flushList()
    } else {
      flushList()
      paragraph.push(line)
    }
  })
  flushParagraph()
  flushList()
  return blocks
}

/**
 * Texto escrito por la comunidad o importado: párrafos, listas (líneas que empiezan por «•») y bloques de código
 * (entre ```), sin contenedor alrededor.
 * `className` se aplica a cada bloque; la separación entre bloques la pone .user-text (index.css). `lang`, si se
 * indica, marca el idioma de cada párrafo (por ejemplo, una noticia en inglés).
 */
export default function UserText({ children, className, lang }) {
  return splitBlocks(children ?? '').map((block, index) => {
    if (block.type === 'code') {
      return (
        <pre
          key={index}
          className={cx(
            'user-text user-code overflow-x-auto rounded-control bg-gray-900 p-4 leading-relaxed text-gray-100 dark:ring-1 dark:ring-white/10',
            className,
          )}
        >
          <code className="font-mono">{block.value}</code>
        </pre>
      )
    }
    if (block.type === 'list') {
      return (
        <ul
          key={index}
          lang={lang}
          className={cx('user-text list-disc space-y-1.5 pl-6 marker:text-accent', className)}
        >
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="break-words pl-1">
              {item}
            </li>
          ))}
        </ul>
      )
    }
    return (
      <p key={index} lang={lang} className={cx('user-text whitespace-pre-wrap break-words', className)}>
        {block.value.trim()}
      </p>
    )
  })
}
