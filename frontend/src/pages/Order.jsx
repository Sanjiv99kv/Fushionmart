import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Order = () => {

  const navigate = useNavigate()
  const { getTotalCartAmount, token, all_products, cartItem, url } = useContext(ShopContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const placeOrder = async (e) => {
    e.preventDefault()
    let orderItems = []
    all_products.map((item) => {
      if (cartItem[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItem[item._id];
        orderItems.push(itemInfo)
      }
    })


    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 49
    }


    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } })
    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);

    } else {
      alert("Error")
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/cart")
    } else if (getTotalCartAmount() === 0) {
      navigate('/cart')
    }
  }, [token])


  return (
    <section className='max-padd-container py-28 xl:py-32'>
      <form onSubmit={placeOrder} action="" className='flex flex-col xl:flex-row gap-20 xl:gap-28'>
        <div className='flex flex-1 flex-col gap-3 text-[95%]'>
          <h3 className='bold-28 mb-4'>Delivery Information</h3>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} value={data.firstname} type="text" required name='firstname' placeholder='First Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
            <input onChange={onChangeHandler} value={data.lastname} type="text" required name='lastname' placeholder='Last Name' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
          </div>
          <input onChange={onChangeHandler} value={data.email} type="email" required name='email' placeholder='Email' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-full' />
          <input onChange={onChangeHandler} value={data.phone} type="text" required name='phone' placeholder='Phone' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-full' />
          <input onChange={onChangeHandler} value={data.street} type="text" required name='street' placeholder='Street' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-full' />
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} value={data.city} type="text" required name='city' placeholder='City' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
            <input onChange={onChangeHandler} value={data.state} type="text" required name='state' placeholder='State' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
          </div>
          <div className='flex gap-3'>
            <input onChange={onChangeHandler} value={data.zipcode} type="text" required name='zipcode' placeholder='Zip code' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
            <input onChange={onChangeHandler} value={data.country} type="text" required name='country' placeholder='Country' className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2' />
          </div>
        </div>


        <div className='flex flex-1 flex-col'>
          <div className='flex flex-col gap-2'>
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
            <button type='submit' className='btn-secondary w-52 rounded'>Proceed to Payment</button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Order
