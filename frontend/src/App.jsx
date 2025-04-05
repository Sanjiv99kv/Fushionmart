import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Product from './pages/Product'
import Order from './pages/Order'
import Cart from './pages/Cart'
import MyOrder from './pages/MyOrder'
import Verify from './pages/Verify'
import Footer from './components/Footer'
import { useState } from 'react'
import LoginPopup from './components/LoginPopup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      <BrowserRouter>
      <ToastContainer/>
        <Header setShowLogin={setShowLogin} />
        {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/order' element={<Order />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/myorders' element={<MyOrder />}></Route>
          <Route path='/verify' element={<Verify />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
