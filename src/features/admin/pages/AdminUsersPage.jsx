import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import ActionMenu from '@/shared/components/ActionMenu'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
import ButtonLink from '@/shared/components/ButtonLink'
import ConfirmDialog from '@/shared/components/ConfirmDialog'
import Icon from '@/shared/components/Icon'
import PageHeader from '@/shared/components/PageHeader'
import SearchBar from '@/shared/components/SearchBar'
import Seo from '@/shared/components/Seo'
import Time from '@/shared/components/Time'
import { paths } from '@/shared/config/paths'
import { useAction } from '@/shared/hooks/useAction'
import PagedTable from '../components/PagedTable'
import { useAdminList } from '../hooks/useAdminList'
import { adminUsersService } from '../services/adminUsersService'

/** Texto de cada confirmación: activar/desactivar la cuenta o dar/quitar el permiso de administración. */
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
  // Acción pendiente de confirmar: { type: 'status' | 'role', user }.
  const [pendingAction, setPendingAction] = useState(null)

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
          <Badge tone={user.enabled ? 'green' : 'red'}>{user.enabled ? 'Activo' : 'Desactivado'}</Badge>
          {!user.emailVerified && <Badge tone="amber">Email sin verificar</Badge>}
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
        return (
          <ActionMenu className="justify-end md:justify-start">
            <ButtonLink to={paths.adminUserProfile(user.id)} variant="secondary" size="sm">
              <Icon name="pencil" className="h-4 w-4" />
              Editar perfil
              <span className="sr-only"> de {user.name}</span>
            </ButtonLink>
            {/* Nadie cambia su propio permiso (así siempre queda alguien con acceso), y para ser admin hace falta
                el email verificado. */}
            {!isSelf && (isAdmin || user.emailVerified) && (
              <Button variant="secondary" size="sm" onClick={() => setPendingAction({ type: 'role', user })}>
                <Icon name="shield" className="h-4 w-4" />
                {isAdmin ? 'Quitar admin' : 'Hacer admin'}
                <span className="sr-only"> a {user.name}</span>
              </Button>
            )}
            {/* A un administrador primero se le quita el permiso; después se puede desactivar su cuenta. */}
            {!isSelf && !isAdmin && (
              <Button
                variant={user.enabled ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => setPendingAction({ type: 'status', user })}
              >
                <Icon name={user.enabled ? 'ban' : 'check'} className="h-4 w-4" />
                {user.enabled ? 'Desactivar' : 'Activar'}
                <span className="sr-only"> a {user.name}</span>
              </Button>
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
