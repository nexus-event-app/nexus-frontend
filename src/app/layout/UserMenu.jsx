import { useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Avatar from '@/shared/components/Avatar'
import Icon from '@/shared/components/Icon'
import { paths } from '@/shared/config/paths'
import { useDismiss } from '@/shared/hooks/useDismiss'
import { useI18n } from '@/shared/i18n/useI18n'
import { useToast } from '@/shared/hooks/useToast'

export default function UserMenu() {
  const { user, isAdmin, logout } = useAuth()
  const toast = useToast()
  const { t } = useI18n()
  const location = useLocation()
  const menuId = useId()
  const containerRef = useRef(null)
  const [openKey, setOpenKey] = useState(null)
  const open = openKey === location.key

  useDismiss(containerRef, open, () => setOpenKey(null))

  const handleLogout = () => {
    logout()
    toast.info(t('common.account.loggedOut'))
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpenKey(open ? null : location.key)}
        aria-expanded={open}
        aria-controls={menuId}
        className="flex min-h-[2.75rem] items-center gap-2 rounded-control px-2 text-sm font-semibold text-ink hover:bg-slate-100"
      >
        <Avatar name={user.name} />
        <span className="max-w-[10rem] truncate">{user.name}</span>
        <Icon name="chevron-down" className="h-4 w-4" />
      </button>
      {open && (
        <div id={menuId} className="card absolute right-0 z-50 mt-2 w-64 animate-fade-in p-2 shadow-pop">
          <div className="border-b border-slate-200 px-3 pb-2 pt-1">
            <p className="truncate font-semibold text-ink">{user.name}</p>
            <p className="truncate text-sm text-ink-muted">{user.email}</p>
          </div>
          <ul className="pt-2">
            {isAdmin && (
              <li>
                <Link
                  to={paths.admin}
                  className="flex min-h-[2.75rem] items-center gap-2 rounded-control px-3 font-medium text-ink-soft hover:bg-slate-100"
                >
                  <Icon name="shield" />
                  {t('common.account.admin')}
                </Link>
              </li>
            )}
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="flex min-h-[2.75rem] w-full items-center gap-2 rounded-control px-3 text-left font-medium text-ink-soft hover:bg-slate-100"
              >
                <Icon name="logout" />
                {t('common.account.logout')}
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
