import React from 'react'
import './App.css'
import LoginForm from './components/LoginForm'
import { Route, Routes } from 'react-router-dom'
import Dashbord from './components/Dashbord'
const App = () => {
  return (
    <div className='container mt-5'>
      {/* router section */}
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/dashbord' element={<Dashbord />} />
      </Routes>
    </div>
  )
}

export default App