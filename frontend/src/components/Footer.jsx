import React from 'react'
import {Link} from 'react-router-dom'
import SocialIcons from '../components/SocialIcons'

const Footer = () => {
  return (
    <section id='contact' className='bg-tertiary max-padd-container text-white py-12 rounded-xl'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <div className='flex flex-col items-center md:items-start'>
          <Link to={"/"} className='bold-24 mb-4'>
            <h3>Fusion<span className='text-secondary'>Mart</span></h3>
          </Link>
          <p className='text-center md:text-left text-gray-30'>Lorem ipsum dolor sit, veritatis minima ullam reprehenderit impedit, sapiente iste eaque, aspernatur expedita odio tempora minus suscipit laboriosam, facere optio quod! Debitis quos voluptate autem!</p>
        </div>
        <div className='flex flex-col items-center md:items-start'>
          <h4 className='bold-20 mb-4'>Quick Links</h4>
            <ul className='space-y-2 regular-16 text-gray-30'>
              <li><a className='hover:text-secondary' href="/">Home</a></li>
              <li><a className='hover:text-secondary' href="/">Category</a></li>
              <li><a className='hover:text-secondary' href="/">Shop</a></li>
              <li><a className='hover:text-secondary' href="/">Contact</a></li>
            </ul>
        </div>
        <div className='flex flex-col items-center md:items-start'>
          <h4 className='text-lg mb-4'>Contact Us</h4>
          <p className='text-gray-30'>Email: <a className='hover:text-secondary' href="">support@fusionmart.com</a></p>
          <p className='text-gray-30'>Phone: <a className='hover:text-secondary' href="">+1234567890</a></p>
          <p className='text-gray-30'>Adress: 123 Fusion Street City Country</p>
        </div>
      </div>
      <div className='flex flex-col items-center mt-8'>
        <SocialIcons/>
        <hr  className='h-[1px] w-full max-w-screen-md my-4 border-gray-50'/>
        <p className='text-gray-30 text-center text-sm'>&copy; {new Date().getFullYear()} FusionMart | All rights reserved</p>
      </div>
    </section>
  )
}

export default Footer
