import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { ShopContext } from '../context/ShopContext'


const Item = ({ Product }) => {
  const {cartItem,addToCart,removeFromCart,url} = useContext(ShopContext);
  return (
    <div>
      <Link to={`/product/${Product._id}`} className='relative top-20 group bg-white flexCenter rounded-2xl ring-1 m-4 ring-slate-200/20 hover:shadow-sm'>
        <img src={url+"/images/"+Product.image} alt="product" height={222} width={222} className='object-cover h-38' />
      </Link>
      <div className='p-3 pt-28 bg-primary rounded-xl'>
        <h4 className='medium-18 line-clamp-1'>{Product.name}</h4>
        <h5 className='text-[16px] font-bold text-gray-900/50 mb-1'>{Product.category}</h5>
        <p className='line-clamp-2'>{Product.description}</p>
        <div className='flexBetween mt-3'>
          <div className='text-secondary bold-18'>Rs.{Product.price}</div>
          <div>
            {!cartItem[Product._id] ? (<FaPlus onClick={()=>{addToCart(Product._id)}} className='bg-white h-8 w-8 p-2 rounded-full shadow-inner cursor-pointer'/>)
              :
              (<div className='bg-white rounded-full flexCenter gap-2 h-8'>
                <FaMinus onClick={()=>{removeFromCart(Product._id)}} className='bg-primary h-6 w-6 p-1 ml-1 cursor-pointer rounded-full'/>
                <p>{cartItem[Product._id]}</p>
                <FaPlus onClick={()=>{addToCart(Product._id)}} className='bg-secondary h-6 w-6 p-1 ml-1 cursor-pointer rounded-full'/>
                </div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item
