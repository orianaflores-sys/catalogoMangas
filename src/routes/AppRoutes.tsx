import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import PrivateLayout from '../layouts/PrivateLayout'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Perfil from '../pages/Perfil'
import Catalogo from '../pages/Catalogo'
import GestionMangas from '../pages/GestionMangas'
import Unauthorized from '../pages/Unauthorized'
import NotFound from '../pages/NotFound'
import DetalleManga from '../pages/DetalleManga'
import Favoritos from '../pages/Favoritos'
import Register from '../pages/Register'

import PublicRoute from './PublicRoute'
import PrivateRoute from './PrivateRoute'
import RoleRoute from './RoleRoute'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

           <Route

            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Route>

        <Route
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/manga/:id" element={<DetalleManga />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route
            path="/gestion-mangas"
            element={
              <RoleRoute allowedRole="Administrador">
                <GestionMangas />
              </RoleRoute>
            }
          />
        </Route>

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes