import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Add from './pages/Add'
import List from './pages/List'
import Order from './pages/Order'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const url = "http://localhost:4000"
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <hr />
        <div className='flex max-padd-container'>
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Order url={url} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
