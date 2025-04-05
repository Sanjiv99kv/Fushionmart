import React, { useContext } from 'react'
import { ShopContext } from "../context/ShopContext"
import { TbTrash } from 'react-icons/tb'
import {useNavigate} from 'react-router-dom'

const Cart = () => {

  const { all_products, cartItem, removeFromCart, getTotalCartAmount ,url} = useContext(ShopContext);
  const navigate = useNavigate();

  return (
    <section className='max-padd-container pt-20'>
      <div className='py-10'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12'>
              <th className='p-1 text-left'>Products</th>
              <th className='p-1 text-left'>Title</th>
              <th className='p-1 text-left'>Price</th>
              <th className='p-1 text-left'>Quantity</th>
              <th className='p-1 text-left'>Total</th>
              <th className='p-1 text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {all_products.map((product) => {
              if (cartItem[product._id] > 0)
                return (
                  <tr key={product._id} className='border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left'>
                    <td className='p-1'>
                      <img src={url+"/images/"+product.image} alt="" height={43} width={43} className='rounded-lg ring-1 ring-slate-900/5 m-1' />
                    </td>
                    <td className='p-1'>
                      <div className='line-clamp-3'>
                        {product.name}
                      </div>
                    </td>
                    <td className='p-1'>Rs.{product.price}</td>
                    <td className='p-1'>{cartItem[product._id]}</td>
                    <td className='p-1'>Rs.{product.price * cartItem[product._id]}</td>
                    <td className='p-1'>
                      <div className='bold-22'>
                        <TbTrash onClick={() => { removeFromCart(product._id) }} />
                      </div>
                    </td>
                  </tr>
                )
            })}
          </tbody>
        </table>

        <div className='flex flex-col xl:flex-row gap-20 mt-20'>
          <div className='flex flex-1 flex-col gap-2'>
            <h4 className='bold-22'>Summary</h4>
            <div>
              <div className='flexBetween py-3'>
                <h4 className='medium-16'>Subtotal:</h4>
                <h4 className='text-gray-30 font-semibold'>Rs.{getTotalCartAmount()}</h4>
              </div>
              <hr className='h-[2px] bg-slate-900/15' />
              <div className='flexBetween py-3'>
                <h4 className='medium-16'>Shipping Fee:</h4>
                <h4 className='text-gray-30 font-semibold'>Rs.{getTotalCartAmount() === 0 ? 0 : 49}</h4>
              </div>
              <hr className='h-[2px] bg-slate-900/15' />
              <div className='flexBetween py-3'>
                <h4 className='medium-18'>Total:</h4>
                <h4 className='bold-18'>Rs.{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 49}</h4>
              </div>
            </div>
            <button onClick={()=>navigate("/order")} className='btn-secondary w-52 rounded'>Proceed to Checkout</button>
          </div>
          <div className='flex flex-1 flex-col gap-8'>
              <h4 className='bold-20 capitalize'>Your coupon code enter here:</h4>
              <div className='flexBetween h-[2.8rem] bg-primary ring-1 ring-slate-900/10 w-full max-w-[488px] rounded'>
                <input type="text" placeholder='Enter Coupon code' className='h-full outline-none bg-primary pl-4'/>
                <button type='submit' className='bg-tertiary text-white h-full w-32'>Submit</button>
              </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Cart
