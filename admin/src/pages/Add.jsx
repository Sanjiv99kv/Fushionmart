import React, { useEffect, useState } from 'react'
import upload_area from '../assets/upload_area1.svg'
import { FaPlus } from 'react-icons/fa6'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({url}) => {
  const [image, setImage] = useState(false)
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Men",
  })

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', data.name)
    formData.append('description', data.description)
    formData.append('category', data.category)
    formData.append('price', Number(data.price))
    formData.append('image', image)
    const response = await axios.post(`${url}/api/product/add`,
      formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Men"
      })
      setImage(false)
      toast.success(response.data.message)
    } else {
      toast.error(response.data.message)
    }
  };

  return (
    <section className='p-4 sm:p-10 w-full bg-primary/20'>
      <form onSubmit={onSubmitHandler} action="" className='flex flex-col gap-y-5 max-w-[555px]'>
        <h4 className='bold-22 pb-2 uppercase'>Products Upload</h4>
        <div className='flex flex-col gap-y-2 h-24'>
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : upload_area} alt="" className='h-20' />
          </label>
          <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id='image' hidden required />
        </div>
        <div className='flex flex-col gap-y-2'>
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder='Type here...' className='ring-1 ring-slate-900/10 py-1 px-3 outline-none' />
        </div>
        <div className='flex flex-col gap-y-2'>
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" id="description" placeholder='Write Content here..' rows={6} required className='ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none'></textarea>
        </div>
        <div className='flex items-center gap-x-6 text-gray-900/70 medium-15'>
          <div className='flex flex-col gap-y-2'>
            <p>Product Category</p>
            <select onChange={onChangeHandler} value={data.category} name="category" className='outline-none ring-1 ring-slate-900/10 pl-2'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
              <option value="Electronics">Electronics</option>
              <option value="Cosmetics">Cosmetics</option>
            </select>
          </div>
          <div className='flex flex-col gap-y-2'>
            <p>Product Price</p>
            <input name='price' onChange={onChangeHandler} value={data.price} type="number" placeholder='$20' className='ring-1 ring-slate-900/10 pl-2 outline-none' />
          </div>
        </div>
        <button type='submit' className='btn-dark sm:w-5/12 flexCenter gap-x-2 !py-2 rounded'><FaPlus /></button>
      </form>
    </section>
  )
}

export default Add
