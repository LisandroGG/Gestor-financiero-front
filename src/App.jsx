import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/Home/Home'

function App() {

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
