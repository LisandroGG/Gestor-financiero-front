import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validarSesion } from './redux/actions';

import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import ForgotPassword from './components/Password/ForgotPassword';
import ChangePassword from './components/Password/ChangePassword';
import VerificarCuenta from './components/VerificarCuenta/VerificarCuenta'

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = useSelector(state => state.usuario);
  const executed = useRef(false);

  useEffect(() => {
    const checkSession = async () => {
      if (executed.current) return;
      executed.current = true;

      const sessionValid = await dispatch(validarSesion()); // Esperamos que validarSesion termine
      // Si la sesión no es válida y el usuario no está en rutas permitidas, redirigir a /login
      if (!sessionValid) {
        const allowedRoutes = ["/login", "/register", "/changePassword", "/forgotPassword", "/verificar"];
        if (!allowedRoutes.includes(location.pathname)) {
          navigate("/login");
        }
      } else {
        // Si el usuario está logueado, redirigir a /
        if (location.pathname === "/login" || location.pathname === "/register") {
          navigate("/");
        }
      }
    };

    checkSession();
  }, [dispatch, usuario, navigate, location.pathname]);

  return (
    <div className="bg-fondoBody min-h-screen">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} /> 
        <Route path='/changePassword' element={<ChangePassword />} />
        <Route path="/verificar" element={<VerificarCuenta />} />
      </Routes>
      </div>
  );
}

export default App;
