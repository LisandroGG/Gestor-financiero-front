import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validarSesion } from './redux/actions';

import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/Home/Home'

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const usuario = useSelector(state => state.usuario); // Cambia esto según el estado que uses

  useEffect(() => {
    // Validar sesión cuando la app se carga
    dispatch(validarSesion());
  }, [dispatch]);

  useEffect(() => {
    // Si el usuario no está validado, redirigir a /login o /register
    if (!usuario) {
      // Permitir acceso solo a login y register
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        navigate('/login');
      }
    } else {
      // Si el usuario está logueado, redirigir a /
      if (window.location.pathname === '/login' || window.location.pathname === '/register') {
        navigate('/');
      }
    }
  }, [usuario, navigate]);


  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
  );
}

export default App;
