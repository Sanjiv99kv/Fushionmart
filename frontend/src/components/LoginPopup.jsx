import React, { useState, useEffect, useContext } from 'react'
import { FaRegHospital, FaXmark } from "react-icons/fa6";
import { ShopContext } from '../context/ShopContext';
import axios from 'axios'
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
    const { url, token, setToken, loadCartData } = useContext(ShopContext);
    const [state, setState] = useState("Login")
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onLogin = async (e) => {
        e.preventDefault()
        let newUrl = url;
        if (state === "Login") {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        await fetch(newUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then((resp) => resp.json())
            .then((data) => {
                if (data.success) {
                    setToken(data.token)
                    toast.success(data.message)
                    localStorage.setItem("token", data.token)
                    setShowLogin(false)
                } else {
                    toast.error(data.message)
                }
            })
            .catch((err) => console.log(err))

    }

    return (
        <div className='absolute h-full w-full bg-black/40 z-50 flexCenter'>
            <form onSubmit={onLogin} action="" className='bg-white w-[366px] p-7 rounded-xl shadow-md'>
                <div className='flex justify-between items-baseline'>
                    <h4 className='bold-28'>{state}</h4>
                    <FaXmark onClick={() => { setShowLogin(false) }} className='medium-20 text-slate-900/70 cursor-pointer' />
                </div>
                <div className='flex flex-col gap-4 my-6'>
                    {state === "Sign Up" && (<input onChange={onChangeHandler} value={data.name} name='name' type='text' placeholder='Name' required className='bg-primary border p-2 pl-4 rounded-md'></input>)}
                    <input onChange={onChangeHandler} value={data.email} name='email' type='email' placeholder='Email' required className='bg-primary border p-2 pl-4 rounded-md'></input>
                    <input onChange={onChangeHandler} value={data.password} name='password' type='password' placeholder='Password' required className='bg-primary border p-2 pl-4 rounded-md'></input>
                </div>
                <button type='submit' className='btn-secondary rounded-md w-full'>
                    {state === "Sign Up" ? "Create account" : "Login"}
                </button>
                <div className='flex items-baseline gap-x-3 mt-6 mb-4'>
                    <input type="checkbox" required />
                    <p className='text-gray-30'>By continuing you agree to our <span className='underline'>Terms of Service</span> and <span className='underline'>Privacy Policy</span></p>
                </div>
                {state === "Sign Up" ? (<p className='text-gray-30'>Already have an account ? <span onClick={() => { setState("Login") }} className='text-secondary cursor-pointer'>Login</span></p>) : (<p className='text-gray-30'>Don't have an account ? <span onClick={() => { setState("Sign Up") }} className='text-secondary cursor-pointer'>Sign Up</span></p>)}
            </form>
        </div>
    )
}

export default LoginPopup
