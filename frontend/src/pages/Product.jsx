import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useParams } from 'react-router-dom';
import ProductDescription from '../components/ProductDescription'
import ProductHd from '../components/ProductHd'
import ProductMd from '../components/ProductMd'


const Product = () => {
  const { all_products } = useContext(ShopContext);
  const { productId } = useParams()
  const product = all_products.find((e)=>e._id===productId);

  if(!product){
    return(
      <div className='pt-28 h1'>Product Not Found</div>
    )
  }

  return (
    <section className='max-padd-container py-20'>
      <div>
        <ProductHd product={product}/>
        <ProductMd product={product}/>
        <ProductDescription/>
      </div>
    </section>
  )
}

export default Product
