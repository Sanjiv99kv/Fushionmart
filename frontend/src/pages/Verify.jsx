import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'

const Verify = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")
  const { url ,token} = useContext(ShopContext);
  const navigate = useNavigate()
  
  
  const VerifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify",{ success:success, orderId:orderId })
    if (response.data.success) {
      navigate("/myorders")
    } else {
      navigate("/")
    }
  }

  useEffect(()=>{
    VerifyPayment()
  },[])

  return (
    <section>
      <div className='min-h-[60vh] grid'>
        <div className='h-24 w-24 place-self-center border-4 border-t-secondary rounded-full animate-spin'></div>
      </div>
    </section>
  )
}

export default Verify
