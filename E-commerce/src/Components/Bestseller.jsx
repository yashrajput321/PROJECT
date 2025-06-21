//src/Components/Bestseller
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const Bestseller = () => {

    const {products} = useContext(ShopContext)
    const [bestseller,setBestseller] = useState([])

    useEffect(()=>{
        const bestProduct = products.filter((item)=>(item.bestseller))
        setBestseller(bestProduct.slice(0,5))
    },[])

  return (
    <div className='my-10' >
        <div className='text-center text-3xl py-8' >
            <Title text1={'BEST'} text2={'SELLER'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates, illum expedita. Omnis, sed tempora nemo, quas incidunt molestias reiciendis eaque obcaecati maiores quisquam est cupiditate iusto ad error vitae consectetur id tempore, eum magni!
            </p>
        </div>
        <div className='grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {bestseller.map((item,index)=>(
                <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default Bestseller