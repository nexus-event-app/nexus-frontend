import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
// Tipografía Ubuntu servida desde la propia web (no desde Google Fonts): sin enviar datos de las visitas a terceros.
import '@fontsource/ubuntu/latin-400.css'
import '@fontsource/ubuntu/latin-500.css'
import '@fontsource/ubuntu/latin-700.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
