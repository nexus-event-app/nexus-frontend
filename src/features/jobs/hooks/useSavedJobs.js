import { useContext } from 'react'
import { SavedJobsContext } from './savedJobsContext'

export function useSavedJobs() {
  const context = useContext(SavedJobsContext)
  if (!context) throw new Error('useSavedJobs debe usarse dentro de SavedJobsProvider')
  return context
}
