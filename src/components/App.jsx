import '../styles/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Booking } from './pages/Booking'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/booking' element={<Booking />}>
          <Route path=':id' element={<Booking />} />
        </ Route >
      </Routes>
    </BrowserRouter>
  )
}

export default App
