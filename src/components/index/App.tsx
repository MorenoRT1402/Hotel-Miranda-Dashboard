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
import { Concierges } from '../pages/Concierges'
import { GuestDetail } from '../pages/GuestDetail'
import { AuthMiddleware } from '../auth/AuthMiddleware'
import React from 'react'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path={pages.login.path} element={<Login />} />
          <Route element={<AuthMiddleware />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path={pages.booking.path} element={<Booking />}>
              </Route>
              <Route path={`${pages.booking.path}/:id`} element={<GuestDetail />} />
              <Route path={pages.rooms.path} element={<Rooms />} />            
              <Route path={pages.concierges.path} element={<Concierges />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}