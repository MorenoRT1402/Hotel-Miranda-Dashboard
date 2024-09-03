import '../styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Booking } from './pages/Booking'
import { ThemeProvider } from 'styled-components'
import { Layout } from './Layout'
import { theme } from '../app/theme'
import { pages } from '../app/pages'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={pages.booking.path} element={<Booking />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
