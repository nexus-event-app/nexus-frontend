import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ActionMenu from '@/shared/components/ActionMenu'
import Badge from '@/shared/components/Badge'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import PageHeader from '@/shared/components/PageHeader'
import SearchBar from '@/shared/components/SearchBar'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { Link } from '@/shared/i18n/router'
import { useAction } from '@/shared/hooks/useAction'
import { useToast } from '@/shared/hooks/useToast'
import { cx } from '@/shared/utils/classNames'
import PagedTable from '../components/PagedTable'
import { useAdminList } from '../hooks/useAdminList'
import { adminUsersService } from '../services/adminUsersService'

function IconAction({ as: Component = 'button', icon, label, active = false, danger = false, ...props }) {
  return (
    <Component
      {...(Component === 'button' ? { type: 'button' } : {})}
      title={label}
      className={cx(
        'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-slate-100',
        active ? 'text-accent' : 'text-ink-muted',
        danger ? 'hover:text-red-700 dark:hover:text-red-400' : 'hover:text-accent',
      )}
      {...props}
    >
      <Icon name={icon} className="h-5 w-5" />
      <span className="sr-only">{label}</span>
    </Component>
  )
}

function confirmation({ type, user }) {
  if (type === 'role') {
    return user.role === 'ADMIN'
      ? {
          title: 'Quitar permiso de administración',
          message: `${user.name} dejará de tener acceso al panel. Su cuenta y su contenido no cambian.`,
          confirmLabel: 'Quitar permiso',
          tone: 'danger',
        }
      : {
          title: 'Hacer administradora o administrador',
          message: `${user.name} tendrá acceso a todo el panel: contenido, usuarios y otros administradores.`,
          confirmLabel: 'Dar permiso',
          tone: 'primary',
        }
  }
  return user.enabled
    ? {
        title: 'Desactivar cuenta',
        message: `¿Quieres desactivar la cuenta de ${user.name}? No podrá iniciar sesión y su sesión actual dejará de ser válida.`,
        confirmLabel: 'Desactivar cuenta',
        tone: 'danger',
      }
    : {
        title: 'Activar cuenta',
        message: `¿Quieres reactivar la cuenta de ${user.name}? Podrá iniciar sesión de nuevo.`,
        confirmLabel: 'Activar cuenta',
        tone: 'primary',
      }
}

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const list = useAdminList('users', adminUsersService.list)
  const [pendingAction, setPendingAction] = useState(null)
  const toast = useToast()

  const [runAction, running] = useAction(async ({ type, user }) => {
    const updated =
      type === 'role'
        ? await adminUsersService.setRole(user.id, user.role === 'ADMIN' ? 'USER' : 'ADMIN')
        : await adminUsersService.setEnabled(user.id, !user.enabled)
    list.mutate((page) => ({
      ...page,
      content: page.content.map((item) => (item.id === updated.id ? updated : item)),
    }))
    setPendingAction(null)
    toast.success(
      type === 'role'
        ? `${updated.name} ahora es ${updated.role === 'ADMIN' ? 'administradora o administrador' : 'usuario normal'}.`
        : `La cuenta de ${updated.name} está ${updated.enabled ? 'activada' : 'desactivada'}.`,
    )
  })

  const columns = [
    { key: 'name', header: 'Nombre', primary: true, render: (user) => user.name },
    { key: 'email', header: 'Email', render: (user) => <span className="break-all">{user.email}</span> },
    {
      key: 'role',
      header: 'Rol',
      render: (user) => (
        <Badge tone={user.role === 'ADMIN' ? 'indigo' : 'slate'}>{user.role === 'ADMIN' ? 'Admin' : 'Usuario'}</Badge>
      ),
    },
    {
      key: 'status',
      header: 'Estado',
      render: (user) => (
        <p className="flex flex-wrap justify-end gap-1.5 md:justify-start">
          {user.deleted ? (
            <Badge tone="slate">Eliminada por su titular</Badge>
          ) : (
            <>
              <Badge tone={user.enabled ? 'green' : 'red'}>{user.enabled ? 'Activo' : 'Desactivado'}</Badge>
              {!user.emailVerified && <Badge tone="amber">Email sin verificar</Badge>}
            </>
          )}
        </p>
      ),
    },
    { key: 'date', header: 'Alta', render: (user) => <Time value={user.createdAt} format="short" /> },
    {
      key: 'actions',
      actions: true,
      header: 'Acciones',
      render: (user) => {
        const isSelf = user.id === currentUser.id
        const isAdmin = user.role === 'ADMIN'
        if (user.deleted) return <span className="text-sm text-ink-muted">—</span>
        return (
          <ActionMenu className="flex-nowrap justify-end gap-1 md:justify-start">
            <IconAction
              as={Link}
              to={paths.adminUserProfile(user.id)}
              icon="pencil"
              label={`Editar perfil de ${user.name}`}
            />
            {!isSelf && (isAdmin || user.emailVerified) && (
              <IconAction
                icon="shield"
                label={isAdmin ? `Quitar admin a ${user.name}` : `Hacer admin a ${user.name}`}
                active={isAdmin}
                onClick={() => setPendingAction({ type: 'role', user })}
              />
            )}
            {!isSelf && !isAdmin && (
              <IconAction
                icon={user.enabled ? 'ban' : 'check'}
                label={user.enabled ? `Desactivar a ${user.name}` : `Activar a ${user.name}`}
                danger={user.enabled}
                onClick={() => setPendingAction({ type: 'status', user })}
              />
            )}
          </ActionMenu>
        )
      },
    },
  ]

  const dialog = pendingAction && confirmation(pendingAction)

  return (
    <>
      <Seo title="Administrar usuarios" path={paths.adminUsers} robots="noindex,nofollow" />
      <PageHeader
        title="Usuarios"
        description="Busca cuentas, edita su perfil, activa o desactiva cuentas y da o quita el permiso de administración."
      />
      <search className="mb-6 block">
        <SearchBar
          value={list.search}
          onSearch={(value) => list.setFilters({ q: value }, { replace: true })}
          label="Buscar usuarios"
          placeholder="Buscar por nombre o email…"
        />
      </search>
      <PagedTable
        list={list}
        columns={columns}
        caption="Listado de usuarios"
        emptyIcon="users"
        emptyTitle="No hay usuarios con estos criterios"
        emptyDescription="Prueba con otra búsqueda."
      />

      {dialog && (
        <ConfirmDialog
          title={dialog.title}
          message={dialog.message}
          confirmLabel={dialog.confirmLabel}
          tone={dialog.tone}
          pending={running}
          onConfirm={() => runAction(pendingAction)}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </>
  )
}
