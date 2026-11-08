import { absoluteUrl } from '@/shared/config/site'
import { paths } from '@/shared/config/paths'
import { excerpt } from '@/shared/utils/text'
import { getCurrentLanguage, translate } from '@/shared/i18n/translate'
import { localizePath } from '@/shared/i18n/languages'

const MAX_COMMENTS_IN_DATA = 10

function person(name) {
  return { '@type': 'Person', name: name || translate('forum.user') }
}

export function buildDiscussionData(discussion, comments) {
  const url = absoluteUrl(localizePath(paths.discussionDetail(discussion), getCurrentLanguage()))
  const commentCount = comments ? comments.length : discussion.commentCount

  return {
    '@context': 'https://schema.org',
    '@type': 'DiscussionForumPosting',
    '@id': url,
    url,
    headline: discussion.title.slice(0, 110),
    text: excerpt(discussion.content, 1000),
    inLanguage: 'es',
    author: person(discussion.authorName),
    datePublished: discussion.createdAt,
    dateModified: discussion.updatedAt || discussion.createdAt,
    commentCount,
    interactionStatistic: [
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/LikeAction',
        userInteractionCount: discussion.likesCount,
      },
      {
        '@type': 'InteractionCounter',
        interactionType: 'https://schema.org/CommentAction',
        userInteractionCount: commentCount,
      },
    ],
    ...(comments?.length > 0 && {
      comment: comments.slice(0, MAX_COMMENTS_IN_DATA).map((comment) => ({
        '@type': 'Comment',
        text: excerpt(comment.content, 500),
        dateCreated: comment.createdAt,
        author: person(comment.authorName),
      })),
    }),
  }
}
