import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './components/Register/Register'
import Login from './components/Login/Login'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
)
}

export default App
