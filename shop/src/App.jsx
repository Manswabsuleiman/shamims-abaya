import React from 'react'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import Abaya from './pages/Abaya'
import Details from './pages/Details'
import Cart from './pages/Cart'
import AI from './pages/AI'
import About from './pages/About'
import Hijabs from './pages/Hijabs'
import HijabsDetails from './pages/HijabsDetails'

const App = () => {
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <Routes>
        <Route path='/' element={<Home />} />
        
        <Route path='/abaya' element={<Abaya />} />
        <Route path='/hijabs' element={<Hijabs />} />
        <Route path='/about' element={<About />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/AI-mode' element={<AI />} />
        <Route path='/hijabsdetails/:id' element={<HijabsDetails />} />
      </Routes>
    </div>
  )
}

export default App