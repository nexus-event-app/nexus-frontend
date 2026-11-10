import { Suspense, useId, useRef, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Button from '@/shared/components/Button'
import ErrorBoundary from '@/shared/components/ErrorBoundary'
import Icon from '@/shared/components/Icon'
import Logo from '@/shared/components/Logo'
import PageLoader from '@/shared/components/PageLoader'
import ThemeToggle from '@/shared/components/ThemeToggle'
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
    <footer className="space-y-3 border-t border-slate-200 pt-4">
      <p className="flex items-center justify-between gap-2 px-1 text-sm text-ink-muted">
        <span className="min-w-0 truncate">
          Sesión de <strong className="font-semibold text-ink">{user.name}</strong>
        </span>
        <ThemeToggle className="shrink-0" />
      </p>
      <Link to={paths.home} className="btn btn-secondary w-full">
        <Icon name="arrow-left" className="h-4 w-4" />
        Ver el sitio
      </Link>
      <Button variant="ghost" className="w-full" onClick={handleLogout}>
        <Icon name="logout" className="h-4 w-4" />
        Cerrar sesión
      </Button>
    </footer>
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

  // #root (index.css) apila la página en columna; en pantallas grandes la barra lateral queda fija a la izquierda.
  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>

      <aside className="hidden flex-col gap-6 overflow-y-auto border-r border-slate-200 bg-surface p-4 lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64">
        <Link to={paths.admin} aria-label={`Panel de administración de ${siteConfig.name}`}>
          <Logo />
        </Link>
        <AdminNav className="flex-1" />
        <AccountBlock />
      </aside>

      <header
        ref={barRef}
        className="page-gutter sticky top-0 z-40 flex flex-wrap items-center justify-between border-b border-slate-200 bg-surface lg:hidden"
      >
        <Link
          to={paths.admin}
          aria-label={`Panel de administración de ${siteConfig.name}`}
          className="flex h-16 items-center"
        >
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
        {open && (
          <section
            id={menuId}
            aria-label="Menú de administración"
            className="basis-full space-y-4 border-t border-slate-200 py-4"
          >
            <AdminNav />
            <AccountBlock />
          </section>
        )}
      </header>

      <main id="contenido" tabIndex={-1} className="page-gutter flex-1 py-8 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 lg:ml-64">
        <ErrorBoundary resetKey={location.pathname} embedded>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
    </>
  )
}
