/**
 * Autoría de una discusión o respuesta tal como se muestra. Si la persona eliminó su cuenta, sale «Cuenta eliminada»
 * (traducido) y sin enlace a un perfil que ya no existe; sin nombre, «Usuario».
 */
export function authorOf(item, t) {
  if (item.authorDeleted) return { id: null, name: t('forum.deletedAccount'), avatarUrl: null }
  return { id: item.authorId, name: item.authorName || t('forum.user'), avatarUrl: item.authorAvatarUrl }
}
