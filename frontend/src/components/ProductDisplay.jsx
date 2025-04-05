import React, { useContext } from 'react'
import { all_products } from '../assets/data.js'
import Item from '../components/Item.jsx'
import { ShopContext } from '../context/ShopContext.jsx'


const ProductDisplay = ({ category }) => {
    const { all_products } = useContext(ShopContext);
    return (
        <section id='shop' className='max-padd-container py-16'>
            <div className='flexBetween pb-20'>
                <h4 className='text-4xl font-extrabold leading-none font-ace flex flex-col'>
                    <span className='medium-16'>See</span>
                    Products
                </h4>
            </div>
            <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8'>
                {all_products.map((product) => {
                    if (category==="All" || category === product.category) {
                        return (
                            <div key={product._id}>
                                <Item Product={product} />
                            </div>
                        )
                    }
                })}
            </div>
        </section>
    )
}

export default ProductDisplay
