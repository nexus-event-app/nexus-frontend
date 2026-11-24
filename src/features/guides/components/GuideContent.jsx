import { Link } from '@/shared/i18n/router'
import { useI18n } from '@/shared/i18n/useI18n'
import { cx } from '@/shared/utils/classNames'

function Inline({ tokens }) {
  const { t } = useI18n()
  return tokens.map((token, index) => {
    if (token.type === 'strong') {
      return (
        <strong key={index} className="font-semibold text-ink">
          {token.text}
        </strong>
      )
    }
    if (token.type === 'link' && token.internal) {
      return (
        <Link key={index} to={token.href} className="link">
          {token.text}
        </Link>
      )
    }
    if (token.type === 'link') {
      return (
        <a key={index} href={token.href} target="_blank" rel="noopener noreferrer" className="link">
          {token.text}
          <span className="sr-only"> {t('common.newTab')}</span>
        </a>
      )
    }
    return token.text
  })
}

export default function GuideContent({ blocks }) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`
        if (block.type === 'h2') {
          return (
            <h2
              key={key}
              id={block.id}
              className="mt-12 scroll-mt-28 text-2xl font-bold tracking-tight text-ink first:mt-0"
            >
              {block.text}
            </h2>
          )
        }
        if (block.type === 'h3') {
          return (
            <h3 key={key} id={block.id} className="mt-8 scroll-mt-28 text-xl font-bold text-ink">
              {block.text}
            </h3>
          )
        }
        if (block.type === 'ul' || block.type === 'ol') {
          const List = block.type
          return (
            <List key={key} className={cx('mt-4 space-y-2 pl-6', block.type === 'ul' ? 'list-disc' : 'list-decimal')}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="pl-1 marker:text-accent">
                  <Inline tokens={item} />
                </li>
              ))}
            </List>
          )
        }
        return (
          <p key={key} className="mt-5 first:mt-0">
            <Inline tokens={block.content} />
          </p>
        )
      })}
    </>
  )
}
