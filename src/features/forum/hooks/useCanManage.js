import { useAuth } from '@/features/auth/hooks/useAuth'

export function useCanManage() {
  const { user, isAdmin } = useAuth()
  return (authorId) => isAdmin || (user !== null && user.id === authorId)
}
