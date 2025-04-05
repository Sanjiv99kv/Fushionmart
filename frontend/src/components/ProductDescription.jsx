import React from 'react'

const ProductDescription = () => {
  return (
    <div className='max-padd-container mt-20'>
      <div className='flex gap-3 mb-4'>
        <button className='text-[16px] btn-dark rounded-sm !text-xs !py-[6px] w-36'>Description</button>
        <button className='text-[16px] btn-dark-outline rounded-sm !text-xs !py-[6px] w-36'>Care Guide</button>
        <button className='text-[16px] btn-dark-outline rounded-sm !text-xs !py-[6px] w-36'>Size Guide</button>
      </div>
      <div className='flex flex-col pb-16'>
        <p className='text-gray-50 text-[15px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat facilis necessitatibus cupiditate voluptate alias perferendis vel in, nobis ut natus omnis consequuntur fugit expedita commodi adipisci praesentium eveniet quisquam a. Sed!</p>
        <br />
        <p className='text-[15px] text-gray-50'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat facilis necessitatibus cupiditate voluptate alias perferendis vel in, nobis ut natus omnis consequuntur fugit expedita commodi adipisci praesentium eveniet quisquam a. Sed!</p>
      </div>
    </div>
  )
}

export default ProductDescription
