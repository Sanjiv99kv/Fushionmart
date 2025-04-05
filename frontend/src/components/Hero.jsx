import React from 'react'
import { Link } from 'react-router-dom'
import { BsFire } from 'react-icons/bs'
import {FaArrowRight} from 'react-icons/fa'

const Hero = () => {
  return (
    <section className='max-padd-container bg-hero bg-center bg-cover bg-no-repeat h-[700px] w-full'>
      <div className='relative max-w-[666px] top-32 xs:top-64'>
        <h4 className='flex items-baseline gap-x-2 uppercase text-secondary medium-18'>Modern collection  <BsFire /></h4>
        <h2 className='capitalize text-[35px] font-bold'>Grab upto 50% Off on selected Products</h2>
        <p className='border-l-4 border-secondary pl-3 my-2'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae ipsa nulla porro sunt nemo maiores sapiente rerum, laudantium error in unde!</p>
        <div className='flex items-center gap-x-4 mt-7'>
          <Link to={''} className='btn-secondary rounded-full flexCenter gap-x-2'>
            Popular Products
            <FaArrowRight/>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
