import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../../styles/index.css'
import '../../styles/styles.css'
import { Provider } from 'react-redux'
import { store } from '../../app/store.js'
import { AuthProvider } from '../auth/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
