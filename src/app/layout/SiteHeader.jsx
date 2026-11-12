import { useCallback, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Button from '@/shared/components/Button'
import Icon from '@/shared/components/Icon'
import Logo from '@/shared/components/Logo'
import { paths } from '@/shared/config/paths'
import LanguageSwitcher from '@/shared/components/LanguageSwitcher'
import ThemeToggle from '@/shared/components/ThemeToggle'
import { useDismiss } from '@/shared/hooks/useDismiss'
import { useI18n } from '@/shared/i18n/useI18n'
import { stripLang } from '@/shared/i18n/languages'
import { useToast } from '@/shared/hooks/useToast'
import NotificationBell from '@/features/notifications/components/NotificationBell'
import SearchButton from '@/features/search/components/SearchButton'
import SearchDialog from '@/features/search/components/SearchDialog'
import { useSearchShortcut } from '@/features/search/hooks/useSearchShortcut'
import NavItems from './NavItems'
import UserMenu from './UserMenu'
import { siteConfig } from '@/shared/config/site'
import { cx } from '@/shared/utils/classNames'

/**
 * Entrar y crear cuenta, como elementos de un menú (<menu>). En la barra de escritorio (`pill`) solo va «Iniciar
 * sesión», en pastilla: «Crear cuenta» ya aparece en la portada y en muchas páginas, y así la barra respira. En el
 * menú del móvil van los dos.
 */
function AuthLinks({ className, pill = false }) {
  const { t } = useI18n()
  return (
    <>
      <li>
        <ButtonLink
          to={paths.login}
          variant="ghost"
          className={cx(
            pill &&
              'whitespace-nowrap rounded-full bg-slate-100 px-4 font-medium text-ink hover:bg-slate-200 sm:text-sm',
            className,
          )}
        >
          {t('common.account.login')}
        </ButtonLink>
      </li>
      {!pill && (
        <li>
          <ButtonLink to={paths.register} className={className}>
            {t('common.account.register')}
          </ButtonLink>
        </li>
      )}
    </>
  )
}

export default function SiteHeader() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const toast = useToast()
  const { t } = useI18n()
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

  // Búsqueda global: una sola ventana para toda la cabecera (botón de escritorio, de móvil y atajo de teclado).
  const [searchOpen, setSearchOpen] = useState(false)
  const openSearch = useCallback(() => {
    setOpenKey(null)
    setSearchOpen(true)
  }, [])
  useSearchShortcut(openSearch)

  // En la portada, el logo apunta a la misma página y no haría nada: en ese caso sube hasta arriba (sin animación con
  // «reducir movimiento»). Desde cualquier otra página lleva a la portada como un enlace normal.
  const handleLogoClick = (event) => {
    if (stripLang(location.pathname) !== paths.home) return
    event.preventDefault()
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
  }

  const handleLogout = () => {
    logout()
    toast.info(t('common.account.loggedOut'))
  }

  return (
    <header
      ref={headerRef}
      className="page-gutter sticky top-0 z-40 flex flex-wrap items-center justify-between gap-x-4 border-b border-slate-200 bg-surface/90 backdrop-blur-md"
    >
      <Link
        to={paths.home}
        onClick={handleLogoClick}
        aria-label={t('common.nav.goHome', { name: siteConfig.name })}
        className="flex h-16 items-center rounded-control xl:h-20"
      >
        <Logo />
      </Link>

      <nav aria-label={t('common.nav.main')} className="hidden xl:block">
        <NavItems />
      </nav>

      <menu className="hidden items-center gap-1.5 xl:flex">
        <li>
          <SearchButton onOpen={openSearch} />
        </li>
        <li>
          <LanguageSwitcher />
        </li>
        {isAuthenticated && (
          <li>
            <NotificationBell />
          </li>
        )}
        {isAuthenticated ? <UserMenu /> : <AuthLinks pill />}
        <li>
          <ThemeToggle />
        </li>
      </menu>

      <SearchButton onOpen={openSearch} compact className="ml-auto xl:hidden" />
      {isAuthenticated && <NotificationBell className="xl:hidden" />}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpenKey(open ? null : location.key)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? t('common.nav.closeMenu') : t('common.nav.openMenu')}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-ink transition-colors hover:border-accent-line hover:text-accent xl:hidden"
      >
        <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
      </button>

      {open && (
        <section
          id={menuId}
          aria-label={t('common.nav.menu')}
          className="basis-full space-y-4 border-t border-slate-200 py-4 xl:hidden"
        >
          <nav aria-label={t('common.nav.mainMobile')}>
            <NavItems orientation="vertical" />
          </nav>
          <menu className="flex items-center justify-between gap-2">
            <li>
              <LanguageSwitcher />
            </li>
            <li>
              <ThemeToggle />
            </li>
          </menu>
          <footer className="space-y-3 border-t border-slate-200 pt-4">
            {isAuthenticated && (
              <p className="px-3 text-sm text-ink-muted">
                {t('common.account.loggedInAs')} <strong className="font-semibold text-ink">{user.name}</strong>
              </p>
            )}
            <menu className="flex flex-col gap-3">
              {isAuthenticated ? (
                <>
                  <li>
                    <ButtonLink to={paths.profile(user)} variant="secondary" className="w-full">
                      <Icon name="user" />
                      {t('common.account.profile')}
                    </ButtonLink>
                  </li>
                  <li>
                    <ButtonLink to={paths.savedJobs} variant="secondary" className="w-full">
                      <Icon name="bookmark" />
                      {t('common.account.savedJobs')}
                    </ButtonLink>
                  </li>
                  {isAdmin && (
                    <li>
                      <ButtonLink to={paths.admin} variant="secondary" className="w-full">
                        <Icon name="shield" />
                        {t('common.account.admin')}
                      </ButtonLink>
                    </li>
                  )}
                  <li>
                    <Button variant="secondary" className="w-full" onClick={handleLogout}>
                      <Icon name="logout" />
                      {t('common.account.logout')}
                    </Button>
                  </li>
                </>
              ) : (
                <AuthLinks className="w-full" />
              )}
            </menu>
          </footer>
        </section>
      )}
      {searchOpen && <SearchDialog onClose={() => setSearchOpen(false)} />}
    </header>
  )
}
