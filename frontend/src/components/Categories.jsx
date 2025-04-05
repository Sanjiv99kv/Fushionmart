import React from 'react'
import { categories } from '../assets/data.js'

const Categories = ({category,setCategory}) => {

  return (
    <section id='categories' className='max-padd-container pt-16'>
      <div className='flexBetween pb-20'>
        <h4 className='text-4xl font-extrabold leading-none font-ace flex flex-col'>
          <span className='medium-16'>Select</span>
          Categories
        </h4>
      </div>
      <div className='flex gap-12 flex-wrap'>
        {categories.map((item) => {
          return (<div onClick={()=>setCategory((prev)=>(prev===item.name?"All":item.name))} id={item.name} key={item.name} className='flexCenter flex-col'>
            <div className='p-8 rounded-2xl cursor-pointer bg-primary'>
              <img src={item.image} alt="cateogoryImg" height={155} width={155} className='object-cover h-32' />
            </div>
            <h4 className={`mt-6 medium-18 ${category===item.name ? "border-b-4 border-secondary":"border-b-4 border-white"}`}>{item.name}</h4>
          </div>)
        })}
      </div>
    </section>
  )
}

export default Categories
