import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import Navbar from '../components/Navbar'
import { MdClose, MdMenu } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { FiPackage } from "react-icons/fi";
import { TbLogout, TbWindElectricity } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6"
import { ShopContext } from '../context/ShopContext';

const Header = ({ setShowLogin }) => {
  const [menuOpened, setmenuOpened] = useState(false)
  const [header, setheader] = useState(false)
  const { token, setToken, getTotalCartItems } = useContext(ShopContext);
  const navigate = useNavigate()

  const toggleMenu = () => {
    setmenuOpened(!menuOpened)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  };

  useEffect(() => {
    const scrollYPos = window.addEventListener("scroll", () => {
      window.scrollY > 40 ? setheader(true) : setheader(false)
    });
    return () => window.removeEventListener("scroll", scrollYPos)
  })
  return (
    <header className={`fixed flex w-full mx-auto top-0 left-0 right-0 py-4 z-30 transition-all max-padd-container flexBetween ${header ? "bg-white shadow-sm" : ""}`}>
      <Link to={"/"} className='bold-24 mb-4'>
        <h3 className='pt-2 text-[30px]'>Fusion<span className='text-secondary'>Mart</span></h3>
      </Link>
      <div className='flexBetween gap-x-20'>
        {/*desktop navbar*/}
        <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"} />
        {/*mobile navbar*/}
        <Navbar containerStyles={`${menuOpened ? "flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md medium-16 ring-1 ring-slate-900/5 transition-all duration-300 w-64 " : "flex items-start flex-col gap-y-12 fixed top-20 p-12 bg-white rounded-3xl shadow-md medium-16 ring-1 ring-slate-900/5 transition-all w-64 duration-300 -right-[100%] "}`}></Navbar>
        <div className='flexBetween gap-x-3 sm:gap-x-8'>
          {/*buttons*/}
          {!menuOpened ? <MdMenu onClick={toggleMenu} className='md:hidden cursor-pointer hover:text-secondary text-2xl' /> : <MdClose onClick={toggleMenu} className='md:hidden cursor-pointer hover:text-secondary text-2xl' />}
          <Link to={'/cart'} className='flex relative'>
            <GiShoppingBag className='text-[22px] text-white bg-secondary h-9 w-9 p-2 rounded-xl' />
            <span className='bg-white text-sm absolute -top-2 -right-3 flexCenter w-5 h-5 rounded-full shadow-md'>{getTotalCartItems()}</span>
          </Link>
          {!token ? (
            <button onClick={() => setShowLogin(true)} className='btn-outline rounded-full'>
              Login
            </button>
          ) : (
            <div className='group relative'>
              <FaCircleUser className='text-2xl ' />
              <ul className='bg-primary shadow-sm p-3 w-24 ring-1 ring-slate-900/5 rounded absolute right-0 group-hover:flex flex-col hidden'>
                <li onClick={() => { navigate("/myorders") }} className='flexCenter gap-x-2 cursor-pointer'>
                  <FiPackage className='text-[19px]' />
                  <p>Orders</p>
                </li>
                <hr className='my-2' />
                <li onClick={() => logout()} className='flexCenter gap-x-2 cursor-pointer'>
                  <TbLogout className='text-[19px]' />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
