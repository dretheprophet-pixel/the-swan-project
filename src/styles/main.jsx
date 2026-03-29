import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Style layers — order matters: base → terminal → codex → animations
import './styles/terminal.css'
import './styles/codex.css'
import './styles/animations.css'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
