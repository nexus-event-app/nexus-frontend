import { BrowserRouter } from 'react-router-dom'
import AuthProvider from '@/features/auth/components/AuthProvider'
import ToastProvider from '@/shared/components/toast/ToastProvider'
import AppRoutes from './AppRoutes'
import ScrollManager from './layout/ScrollManager'

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <ScrollManager />
          <AppRoutes />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
