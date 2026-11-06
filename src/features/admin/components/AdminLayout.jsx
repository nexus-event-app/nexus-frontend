import { Suspense, useId, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Button from '@/shared/components/Button'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import Icon from '@/shared/components/Icon'
import Logo from '@/shared/components/Logo'
import PageLoader from '@/shared/components/PageLoader'
import { paths } from '@/shared/config/paths'
import { useDismiss } from '@/shared/hooks/useDismiss'
import { useToast } from '@/shared/hooks/useToast'
import AdminNav from './AdminNav'
import { siteConfig } from '@/shared/config/site'

function AccountBlock() {
  const { user, logout } = useAuth()
  const toast = useToast()

  const handleLogout = () => {
    logout()
    toast.info('Has cerrado sesión.')
  }

  return (
    <div className="space-y-3 border-t border-slate-200 pt-4">
      <p className="truncate px-1 text-sm text-ink-muted">
        Sesión de <span className="font-semibold text-ink">{user.name}</span>
      </p>
      <Link to={paths.home} className="btn btn-secondary w-full">
        <Icon name="arrow-left" className="h-4 w-4" />
        Ver el sitio
      </Link>
      <Button variant="ghost" className="w-full" onClick={handleLogout}>
        <Icon name="logout" className="h-4 w-4" />
        Cerrar sesión
      </Button>
    </div>
  )
}

export default function AdminLayout() {
  const location = useLocation()
  const menuId = useId()
  const barRef = useRef(null)
  const toggleRef = useRef(null)
  const [openKey, setOpenKey] = useState(null)
  const open = openKey === location.key

  const closeMenu = () => {
    setOpenKey(null)
    toggleRef.current?.focus()
  }

  useDismiss(barRef, open, closeMenu)

  return (
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      <aside className="hidden border-r border-slate-200 bg-white lg:block">
        <div className="sticky top-0 flex h-dvh flex-col gap-6 overflow-y-auto p-4">
          <Link to={paths.admin} aria-label={`Panel de administración de ${siteConfig.name}`}>
            <Logo />
          </Link>
          <div className="flex-1">
            <AdminNav />
          </div>
          <AccountBlock />
        </div>
      </aside>

      <div className="min-w-0">
        <div ref={barRef} className="sticky top-0 z-40 border-b border-slate-200 bg-white lg:hidden">
          <div className="page-container flex h-16 items-center justify-between">
            <Link to={paths.admin} aria-label={`Panel de administración de ${siteConfig.name}`}>
              <Logo />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpenKey(open ? null : location.key)}
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? 'Cerrar menú de administración' : 'Abrir menú de administración'}
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control hover:bg-slate-100"
            >
              <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
            </button>
          </div>
          {open && (
            <div id={menuId} className="page-container space-y-4 border-t border-slate-200 py-4">
              <AdminNav />
              <AccountBlock />
            </div>
          )}
        </div>

        <main id="contenido" tabIndex={-1} className="page-container py-8 focus:outline-none">
          <ErrorBoundary resetKey={location.pathname}>
            <Suspense fallback={<PageLoader />}>
              <Outlet />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
