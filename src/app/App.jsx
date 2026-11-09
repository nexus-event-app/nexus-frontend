import { BrowserRouter } from 'react-router-dom'
import AuthProvider from '@/features/auth/components/AuthProvider'
import I18nProvider from '@/shared/i18n/I18nProvider'
import ToastProvider from '@/shared/components/toast/ToastProvider'
import ThemeProvider from '@/shared/theme/ThemeProvider'
import SavedJobsProvider from '@/features/jobs/components/SavedJobsProvider'
import AppRoutes from './AppRoutes'
import ScrollManager from './layout/ScrollManager'

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <ThemeProvider>
          <ToastProvider>
            <AuthProvider>
              <SavedJobsProvider>
                <ScrollManager />
                <AppRoutes />
              </SavedJobsProvider>
            </AuthProvider>
          </ToastProvider>
        </ThemeProvider>
      </I18nProvider>
    </BrowserRouter>
  )
}
