// RelatedProducts.jsx
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'
import { useNavigate } from 'react-router-dom'

const RelatedProducts = ({category, subCategory, id}) => {
    const {products} = useContext(ShopContext)
    const [related, setRelated] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products
                .filter(item => 
                    category === item.category && 
                    subCategory === item.subCategory && 
                    id !== item._id
                )
                .slice(0, 5);

            setRelated(filteredProducts);
        }
    }, [products, category, subCategory, id]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        window.scrollTo(0, 0);
    };

    return (
        <div className='my-24'>
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={'PRODUCTS'} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item) => (
                    <div 
                        key={item._id} 
                        onClick={() => handleProductClick(item._id)}
                        className="cursor-pointer"
                    >
                        <ProductItem 
                            name={item.name}
                            price={item.price}
                            id={item._id}
                            image={item.image}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedProducts