import { ProductCard } from '@/components/product-card'
import React from 'react'
import { getAllProducts } from '@/server/actions/index'

const page = async () => {
    const productList = await getAllProducts()
    console.log(productList)
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#000007] via-[#00001a] to-[#000022] text-white">
  {/* your content */}
        <div className='w-full text-white'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='max-w-[80%] text-4xl font-black text-center mt-16 md:text-6xl bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent tracking-tight'>
                    Trending Products
                </h1>
                <p className='text-gray-400 text-lg mt-4 text-center max-w-2xl px-4'>
                    Discover the most popular items our community loves
                </p>
            </div>
            <div className='mt-16 flex flex-col px-4'>
                <div className='flex flex-wrap justify-center gap-8 max-w-7xl mx-auto'>
                    {productList?.map((product, index) => (
                    <div 
                        key={index} 
                        className='transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/20'
                    >
                        <ProductCard product={product}/>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default page