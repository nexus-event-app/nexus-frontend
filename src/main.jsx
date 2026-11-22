import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import '@fontsource/ubuntu/latin-400.css'
import '@fontsource/ubuntu/latin-500.css'
import '@fontsource/ubuntu/latin-700.css'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
