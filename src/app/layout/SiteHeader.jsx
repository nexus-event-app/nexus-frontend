import { useCallback, useId, useRef, useState } from 'react'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useLocation } from 'react-router-dom'
import { Link } from '@/shared/i18n/router'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ButtonLink from '@/shared/components/ButtonLink'
import Avatar from '@/shared/components/Avatar'
import Icon from '@/shared/components/Icon'
import Logo from '@/shared/components/Logo'
import { paths } from '@/shared/config/paths'
import LanguageSwitcher from '@/shared/components/LanguageSwitcher'
import ThemeToggle from '@/shared/components/ThemeToggle'
import { useDismiss } from '@/shared/hooks/useDismiss'
import { useMediaQuery } from '@/shared/hooks/useMediaQuery'
import { useI18n } from '@/shared/i18n/useI18n'
import { stripLang } from '@/shared/i18n/languages'
import NotificationBell from '@/features/notifications/components/NotificationBell'
import SiteSearch from '@/features/search/components/SiteSearch'
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
  const { isAuthenticated, isAdmin, user } = useAuth()
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

  // Búsqueda global en la propia cabecera. Solo existe la versión que se ve (escritorio o móvil), para que no haya dos
  // campos ni dos búsquedas a la vez; el atajo de teclado abre esa.
  const isDesktop = useMediaQuery('(min-width: 1280px)')
  const [searchOpen, setSearchOpen] = useState(false)
  const closeSearch = useCallback(() => setSearchOpen(false), [])
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

  const handleLogout = useLogout()

  return (
    <header
      ref={headerRef}
      className="page-gutter sticky top-0 z-40 flex flex-wrap items-center justify-between gap-x-1.5 border-b border-slate-200 bg-surface/90 backdrop-blur-md sm:gap-x-4"
    >
      <Link
        to={paths.home}
        onClick={handleLogoClick}
        aria-label={t('common.nav.goHome', { name: siteConfig.name })}
        className="flex h-16 min-w-0 items-center rounded-control xl:h-20"
      >
        {/* En móviles estrechos el nombre se achica un poco para que la lupa, la campana y el menú quepan al lado. */}
        <Logo className="[&>span]:text-lg min-[380px]:[&>span]:text-xl" />
      </Link>

      <nav aria-label={t('common.nav.main')} className="hidden xl:block">
        <NavItems />
      </nav>

      <menu className="hidden items-center gap-1.5 xl:flex">
        {isDesktop && (
          <li>
            <SiteSearch open={searchOpen} onOpen={openSearch} onClose={closeSearch} className="relative block" />
          </li>
        )}
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

      {/* Móvil: lupa, campana y menú, siempre a la derecha del todo. */}
      {!isDesktop && (
        <SiteSearch
          variant="mobile"
          open={searchOpen}
          onOpen={openSearch}
          onClose={closeSearch}
          className="ml-auto xl:hidden"
        />
      )}
      {isAuthenticated && <NotificationBell className="xl:hidden" />}
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpenKey(open ? null : location.key)}
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={open ? t('common.nav.closeMenu') : t('common.nav.openMenu')}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 text-ink transition-colors hover:border-accent-line hover:text-accent xl:hidden"
      >
        <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
      </button>

      {open && (
        // Menú del móvil, compacto: las secciones en dos columnas, la cuenta como una lista de accesos (con su foto) y,
        // al final, idioma y tema en una sola fila. Si aun así no cabe (móvil apaisado), se desplaza por dentro.
        <section
          id={menuId}
          aria-label={t('common.nav.menu')}
          className="max-h-[calc(100dvh-4.5rem)] basis-full space-y-3 overflow-y-auto overscroll-contain border-t border-slate-200 pb-3 pt-2 xl:hidden"
        >
          <nav aria-label={t('common.nav.mainMobile')}>
            <NavItems orientation="vertical" />
          </nav>

          {isAuthenticated ? (
            <section
              aria-label={t('common.account.menu')}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-surface"
            >
              <header className="flex items-center gap-3 border-b border-slate-200 bg-canvas px-3 py-2.5">
                <Avatar name={user.name} src={user.avatarUrl} size="sm" />
                <p className="min-w-0 text-xs leading-tight text-ink-muted">
                  {t('common.account.loggedInAs')}
                  <strong className="block truncate text-sm font-semibold text-ink">{user.name}</strong>
                </p>
              </header>
              <menu className="divide-y divide-slate-100">
                {[
                  { to: paths.profile(user), icon: 'user', label: t('common.account.profile') },
                  { to: paths.savedJobs, icon: 'bookmark', label: t('common.account.savedJobs') },
                  ...(isAdmin ? [{ to: paths.admin, icon: 'shield', label: t('common.account.admin') }] : []),
                ].map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="flex min-h-[2.75rem] items-center gap-3 px-3 text-sm font-medium text-ink-soft transition-colors hover:bg-canvas hover:text-ink"
                    >
                      <Icon name={item.icon} className="h-4 w-4 text-accent" />
                      {item.label}
                      <Icon name="chevron-right" className="ml-auto h-4 w-4 text-ink-muted" />
                    </Link>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex min-h-[2.75rem] w-full items-center gap-3 px-3 text-left text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10"
                  >
                    <Icon name="logout" className="h-4 w-4" />
                    {t('common.account.logout')}
                  </button>
                </li>
              </menu>
            </section>
          ) : (
            <menu className="grid grid-cols-2 gap-2">
              <AuthLinks className="w-full" />
            </menu>
          )}

          <menu className="flex items-center justify-between gap-2 border-t border-slate-200 pt-3">
            <li>
              <LanguageSwitcher />
            </li>
            <li>
              <ThemeToggle />
            </li>
          </menu>
        </section>
      )}
    </header>
  )
}
