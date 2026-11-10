import { useState } from 'react'
import { useAuth } from '@/features/auth/hooks/useAuth'
import Badge from '@/shared/components/Badge'
import Button from '@/shared/components/Button'
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

export default function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const list = useAdminList('users', adminUsersService.list)
  const [target, setTarget] = useState(null)

  const enabling = target ? !target.enabled : false

  const [changeStatus, changing] = useAction(async (user) => {
    const updated = await adminUsersService.setEnabled(user.id, !user.enabled)
    list.mutate((page) => ({
      ...page,
      content: page.content.map((item) => (item.id === updated.id ? updated : item)),
    }))
    setTarget(null)
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
      render: (user) =>
        user.role === 'ADMIN' || user.id === currentUser.id ? (
          <span className="text-sm text-ink-muted">Sin acciones</span>
        ) : (
          <Button variant={user.enabled ? 'secondary' : 'primary'} size="sm" onClick={() => setTarget(user)}>
            <Icon name={user.enabled ? 'ban' : 'check'} className="h-4 w-4" />
            {user.enabled ? 'Desactivar' : 'Activar'}
            <span className="sr-only"> a {user.name}</span>
          </Button>
        ),
    },
  ]

  return (
    <>
      <Seo title="Administrar usuarios" path={paths.adminUsers} robots="noindex,nofollow" />
      <PageHeader title="Usuarios" description="Busca usuarios y activa o desactiva sus cuentas." />
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

      {target && (
        <ConfirmDialog
          title={enabling ? 'Activar cuenta' : 'Desactivar cuenta'}
          message={
            enabling
              ? `¿Quieres reactivar la cuenta de ${target.name}? Podrá iniciar sesión de nuevo.`
              : `¿Quieres desactivar la cuenta de ${target.name}? No podrá iniciar sesión y su sesión actual dejará de ser válida.`
          }
          confirmLabel={enabling ? 'Activar cuenta' : 'Desactivar cuenta'}
          tone={enabling ? 'primary' : 'danger'}
          pending={changing}
          onConfirm={() => changeStatus(target)}
          onCancel={() => setTarget(null)}
        />
      )}
    </>
  )
}
