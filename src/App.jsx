import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { validarSesion } from './redux/actions';

import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/Home/Home'

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        dispatch(validarSesion());
    }, [dispatch]);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
)
}

export default App
