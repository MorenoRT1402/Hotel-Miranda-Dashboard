import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../styles/index.css'
import '../../styles/styles.css'
import { Provider } from 'react-redux'
import { App } from './App.tsx'
import { store } from '../../app/store.ts'
import { AuthProvider } from '../auth/AuthProvider.tsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)