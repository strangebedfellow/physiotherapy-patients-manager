import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'
import AppProviders from './AppProviders'
import ConfigError from './components/ConfigError'
import { missingFirebaseEnv } from './lib/firebaseConfig'

const root = createRoot(document.getElementById('root')!)

const render = (node: ReactNode) =>
  root.render(
    <StrictMode>
      <AppProviders>{node}</AppProviders>
    </StrictMode>,
  )

if (missingFirebaseEnv.length > 0) {
  render(<ConfigError missing={missingFirebaseEnv} />)
} else {
  // App (a z nim Firebase SDK) ładujemy dopiero, gdy konfiguracja jest kompletna.
  void import('./App').then(({ default: App }) => render(<App />))
}
