import '../styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Booking } from './pages/Booking'
import { ThemeProvider } from 'styled-components'
import { theme } from '../theme'

function App() {

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/booking' element={<Booking />}>
          <Route path=':id' element={<Booking />} />
        </ Route >
      </Routes>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
