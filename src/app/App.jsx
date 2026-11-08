import { BrowserRouter } from 'react-router-dom'
import AuthProvider from '@/features/auth/components/AuthProvider'
import I18nProvider from '@/shared/i18n/I18nProvider'
import ToastProvider from '@/shared/components/toast/ToastProvider'
import AppRoutes from './AppRoutes'
import ScrollManager from './layout/ScrollManager'

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <ToastProvider>
          <AuthProvider>
            <ScrollManager />
            <AppRoutes />
          </AuthProvider>
        </ToastProvider>
      </I18nProvider>
    </BrowserRouter>
  )
}
