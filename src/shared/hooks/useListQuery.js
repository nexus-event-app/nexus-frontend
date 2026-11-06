import { useCallback } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

const MAX_PAGE = 1000

function parsePage(raw) {
  const page = Number.parseInt(raw ?? '', 10)
  if (!Number.isFinite(page) || page < 1) return 1
  return Math.min(page, MAX_PAGE)
}

export function useListQuery(filterKeys = []) {
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const page = parsePage(searchParams.get('page'))
  const filters = Object.fromEntries(filterKeys.map((key) => [key, searchParams.get(key) ?? '']))
  const hasFilters = Object.values(filters).some(Boolean)

  const setFilters = useCallback(
    (patch, { replace = false } = {}) => {
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous)
          Object.entries(patch).forEach(([key, value]) => {
            if (value) next.set(key, value)
            else next.delete(key)
          })
          next.delete('page')
          return next
        },
        { replace },
      )
    },
    [setSearchParams],
  )

  const buildHref = useCallback(
    (nextPage, patch = {}) => {
      const next = new URLSearchParams(searchParams)
      Object.entries(patch).forEach(([key, value]) => {
        if (value) next.set(key, value)
        else next.delete(key)
      })
      if (nextPage > 1) next.set('page', String(nextPage))
      else next.delete('page')
      const query = next.toString()
      return query ? `${pathname}?${query}` : pathname
    },
    [pathname, searchParams],
  )

  return { page, filters, hasFilters, setFilters, buildHref }
}
