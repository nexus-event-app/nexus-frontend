export function authorOf(item, t) {
  if (item.authorDeleted) return { id: null, name: t('forum.deletedAccount'), avatarUrl: null }
  return { id: item.authorId, name: item.authorName || t('forum.user'), avatarUrl: item.authorAvatarUrl }
}
