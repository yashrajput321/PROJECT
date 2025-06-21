//src/Components/LatestCollection
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const LatestCollection = () => {

    const {products} = useContext(ShopContext)
    const [latestProduct,setLatestProduct] = useState([])

    useEffect(()=>{
        setLatestProduct(products.slice(0,10))
    },[])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <Title text1={'LATEST'} text2={'COLLECTION'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Similique, ipsa commodi quis in rerum nesciunt. Facilis minus nobis quos eos tempora doloribus exercitationem labore, quasi, nesciunt facere delectus. Perspiciatis, placeat?
            </p>
        </div>
        {/* Rederning products */}
        <div className='grid grid-cols-2 sm:grid-col-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
            {
                latestProduct.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}  />
                ))
            }
        </div>
    </div>
  )
}

export default LatestCollection