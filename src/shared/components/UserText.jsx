import { Fragment } from 'react'
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
  return blocks
}

export default function UserText({ children, className }) {
  const blocks = splitBlocks(children ?? '')

  return (
    <div className={cx('space-y-4 break-words', className)}>
      {blocks.map((block, index) => (
        <Fragment key={index}>
          {block.type === 'code' ? (
            <pre className="overflow-x-auto rounded-control bg-slate-900 p-4 text-sm leading-relaxed text-slate-100">
              <code className="font-mono">{block.value}</code>
            </pre>
          ) : (
            block.value.trim() && <p className="whitespace-pre-wrap">{block.value.trim()}</p>
          )}
        </Fragment>
      ))}
    </div>
  )
}
