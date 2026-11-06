import { useId, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Logo from '@/shared/components/Logo'
import { paths } from '@/shared/config/paths'
import { useDismiss } from '@/shared/hooks/useDismiss'
import { useToast } from '@/shared/hooks/useToast'
import NavItems from './NavItems'
import UserMenu from './UserMenu'

function AuthLinks() {
  return (
    <>
      <ButtonLink to={paths.login} variant="ghost">
        Iniciar sesión
      </ButtonLink>
      <ButtonLink to={paths.register}>Crear cuenta</ButtonLink>
    </>
  )
}

export default function SiteHeader() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const toast = useToast()
  const location = useLocation()
  const menuId = useId()
  const headerRef = useRef(null)
  const toggleRef = useRef(null)
  const [openKey, setOpenKey] = useState(null)
  const open = openKey === location.key

  const closeMenu = () => {
    setOpenKey(null)
    toggleRef.current?.focus()
  }

  useDismiss(headerRef, open, closeMenu)

  const handleLogout = () => {
    logout()
    toast.info('Has cerrado sesión.')
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Link to={paths.home} aria-label="StartDev, ir al inicio" className="rounded-control">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <NavItems />
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {isAuthenticated ? <UserMenu /> : <AuthLinks />}
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpenKey(open ? null : location.key)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-control text-ink hover:bg-slate-100 lg:hidden"
        >
          <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
        </button>
      </div>

      {open && (
        <div id={menuId} className="border-t border-slate-200 bg-white lg:hidden">
          <div className="page-container space-y-4 py-4">
            <nav aria-label="Principal (móvil)">
              <NavItems orientation="vertical" />
            </nav>
            <div className="border-t border-slate-200 pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <p className="px-3 text-sm text-ink-muted">
                    Sesión iniciada como <span className="font-semibold text-ink">{user.name}</span>
                  </p>
                  {isAdmin && (
                    <ButtonLink to={paths.admin} variant="secondary" className="w-full">
                      <Icon name="shield" />
                      Panel de administración
                    </ButtonLink>
                  )}
                  <Button variant="secondary" className="w-full" onClick={handleLogout}>
                    <Icon name="logout" />
                    Cerrar sesión
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <AuthLinks />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
