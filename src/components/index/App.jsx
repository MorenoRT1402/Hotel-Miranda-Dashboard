import '../../styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Booking } from '../pages/Booking'
import { ThemeProvider } from 'styled-components'
import { Layout } from './Layout'
import { theme } from '../../app/theme'
import { pages } from '../../app/pages'
import { Login } from '../pages/Login'
import { Rooms } from '../pages/Rooms'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={pages.booking.path} element={<Booking />} />
            <Route path={pages.rooms.path} element={<Rooms />} />
          </Route>
          <Route path={pages.login.path} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
