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
      if (executed.current) return;
      executed.current = true;
      dispatch(validarSesion());
  }, [dispatch]);

  useEffect(() => {
    // Si el usuario no está validado, redirigir a /login o /register
    if (!usuario) {
        const allowedRoutes = ["/login", "/register", "/changePassword", "/forgotPassword", "/verificar", "/home"];

        if (!allowedRoutes.includes(location.pathname)) {
            navigate("/login");
        }
    } else {
        // Si el usuario está logueado, redirigir a /home
        if (location.pathname === "/login" || location.pathname === "/register") {
            navigate("/home");
        }
    }
}, [usuario, navigate, location.pathname]);

  return (
    <div className="bg-fondoBody min-h-screen">
        <div className="flex flex-col items-center justify-center h-screen bg-fondoBody">
            <img src="/assets/LoadingGif.gif" alt="Cargando..." className="w-20 h-20 mx-auto" />
            <p>Por favor, espera unos segundos.</p>
        </div>
      <Routes>
        <Route path='/home' element={<Home />} />
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
