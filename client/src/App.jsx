import { useState } from 'react';
import MapPage from './pages/MapPage';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/pins' element={<MapPage />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
