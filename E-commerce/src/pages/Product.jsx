//src/pages/Product
import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'

const Product = () => {

  const {productId} = useParams()
  const {products,currency} = useContext(ShopContext)
  const [productData,setProductData] = useState(false)
  const [image,setImage] = useState('')
  const [size,setSize] = useState('')
  const [quantity, setQuantity] = useState(1)

  const fetchProductData = async()=>{

    products.map((item)=>{
      if(item._id===productId){
        setProductData(item)
        setImage(item.image[0])
        return null
      }
    })

  }

  // Function to handle quantity changes
  const handleQuantity = (type) => {
    if(type === 'decrease') {
      quantity > 1 && setQuantity(prev => prev - 1)
    } else {
      setQuantity(prev => prev + 1)
    }
  }

  useEffect(()=>{
   fetchProductData();
  },[productId,products])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 ' >
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row '>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row ' >
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full '>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} alt="product image" className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ' />
              ))
            }
          </div>
          <div className='w-full sm:w-[75%]'>
            <img className='w-full h-auto' src={image} alt="Product image" />
          </div>
        </div>
        {/* Product Info */}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className='w-3.5'/>
              <img src={assets.star_icon} alt="" className='w-3.5'/>
              <img src={assets.star_icon} alt="" className='w-3.5'/>
              <img src={assets.star_icon} alt="" className='w-3.5'/>
              <img src={assets.star_dull_icon} alt="" className='w-3.5'/>
              <p className='pl-2' >(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium' >{currency}{productData.price}</p>
            <p className='mt-5 text-gray-500 md:w-4/5' >{productData.description}</p>
            <div className='flex flex-col gap-4 my-8' >
              <p>Select Size</p>
              <div className='flex gap-2' >
                {
                  productData.sizes.map((item,index)=>(
                    <button onClick={()=>setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item===size ? 'border-2 border-black':''}`} >{item}</button>
                  ))
                }
              </div>
            </div>
            {/* Quantity and Add to Cart section */}
            <div className='flex items-center gap-8'>
              <div className='flex items-center gap-4'>
                <p>Quantity:</p>
                <div className='flex items-center gap-4 border rounded-md px-4 py-2'>
                  <button 
                    onClick={() => handleQuantity('decrease')}
                    className='text-xl font-medium hover:text-gray-700'
                  >
                    -
                  </button>
                  <span className='w-8 text-center'>{quantity}</span>
                  <button 
                    onClick={() => handleQuantity('increase')}
                    className='text-xl font-medium hover:text-gray-700'
                  >
                    +
                  </button>
                </div>
              </div>
              <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
                ADD TO CART
              </button>
            </div>
            <hr className='mt-8 sm:w-4/5' />
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1' >
              <p>100% Original Product</p>
              <p>Cash on delivery is available on this product</p>
              <p>Easy Return and Exchange policy within 7 days</p>
            </div>
        </div>
      </div>
      {/* description and review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm '>Description</b>
          <p className='border px-5 py-3 text-sm '>Review (122)</p>
        </div>
      </div>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product