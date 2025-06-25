// Product.jsx
import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import RelatedProducts from '../Components/RelatedProducts';

const Product = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);
    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTab, setSelectedTab] = useState('description'); // For description/review tabs

    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top when component mounts
        setIsLoading(true);
        setSize('');
        setQuantity(1);
        
        const product = products.find(item => item._id === productId);
        if (product) {
            setProductData(product);
            setImage(product.image[0]);
        }
        setIsLoading(false);
    }, [productId, products]);

    const handleQuantity = (type) => {
        if(type === 'decrease') {
            quantity > 1 && setQuantity(prev => prev - 1);
        } else {
            setQuantity(prev => prev + 1);
        }
    };

    const handleAddToCart = () => {
        if (!size) {
            alert("Please select a size");
            return;
        }
        
        const success = addToCart(productData._id, size, quantity);
        if (success) {
            const userChoice = window.confirm('Added to cart! Would you like to view your cart?');
            if (userChoice) {
                navigate('/cart');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (!productData) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                <button 
                    onClick={() => navigate('/')}
                    className="text-blue-600 hover:underline"
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className='max-w-7xl mx-auto px-4 py-10'>
            {/* Product Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mb-16'>
                {/* Image Gallery */}
                <div className='space-y-4'>
                    {/* Main Image */}
                    <div className='aspect-square overflow-hidden rounded-lg bg-gray-100'>
                        <img 
                            src={image} 
                            alt={productData.name}
                            className='w-full h-full object-cover object-center'
                        />
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    <div className='grid grid-cols-4 gap-4'>
                        {productData.image.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setImage(img)}
                                className={`aspect-square rounded-md overflow-hidden ${
                                    img === image ? 'ring-2 ring-black' : ''
                                }`}
                            >
                                <img 
                                    src={img} 
                                    alt={`${productData.name} view ${index + 1}`}
                                    className='w-full h-full object-cover object-center'
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className='space-y-6'>
                    {/* Basic Info */}
                    <div>
                        <h1 className='text-3xl font-bold mb-2'>{productData.name}</h1>
                        <div className='flex items-center gap-4 mb-4'>
                            <div className='flex items-center'>
                                {[...Array(5)].map((_, index) => (
                                    <img 
                                        key={index}
                                        src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                                        alt="star"
                                        className='w-4 h-4'
                                    />
                                ))}
                            </div>
                            <span className='text-gray-500'>(122 reviews)</span>
                        </div>
                        <p className='text-2xl font-bold mb-4'>
                            {currency}{productData.price}
                        </p>
                        <p className='text-gray-600 leading-relaxed'>
                            {productData.description}
                        </p>
                    </div>

                    {/* Size Selection */}
                    <div>
                        <h3 className='font-medium mb-3'>Select Size</h3>
                        <div className='flex flex-wrap gap-3'>
                            {productData.sizes.map((sizeOption, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(sizeOption)}
                                    className={`
                                        px-4 py-2 rounded-md text-sm font-medium
                                        ${size === sizeOption
                                            ? 'bg-black text-white'
                                            : 'bg-gray-100 hover:bg-gray-200'
                                        }
                                    `}
                                >
                                    {sizeOption}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className='space-y-4'>
                        <div className='flex items-center gap-4'>
                            <span className='font-medium'>Quantity:</span>
                            <div className='flex items-center border rounded-md'>
                                <button
                                    onClick={() => handleQuantity('decrease')}
                                    className='px-4 py-2 hover:bg-gray-100'
                                >
                                    -
                                </button>
                                <span className='px-4 py-2 border-x'>
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantity('increase')}
                                    className='px-4 py-2 hover:bg-gray-100'
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddToCart}
                            className={`
                                w-full py-3 rounded-md font-medium
                                ${size
                                    ? 'bg-black text-white hover:bg-gray-900'
                                    : 'bg-gray-200 cursor-not-allowed'
                                }
                            `}
                        >
                            {size ? 'Add to Cart' : 'Select Size'}
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className='border-t pt-6 space-y-2 text-sm text-gray-500'>
                        <p>✓ Free shipping on orders over {currency}499</p>
                        <p>✓ Free returns within 30 days</p>
                        <p>✓ 100% Authentic products</p>
                    </div>
                </div>
            </div>

            {/* Description and Reviews Tabs */}
            <div className='mb-16'>
                <div className='flex border-b'>
                    <button
                        onClick={() => setSelectedTab('description')}
                        className={`px-6 py-3 text-sm font-medium ${
                            selectedTab === 'description'
                                ? 'border-b-2 border-black'
                                : 'text-gray-500'
                        }`}
                    >
                        Description
                    </button>
                    <button
                        onClick={() => setSelectedTab('reviews')}
                        className={`px-6 py-3 text-sm font-medium ${
                            selectedTab === 'reviews'
                                ? 'border-b-2 border-black'
                                : 'text-gray-500'
                        }`}
                    >
                        Reviews (122)
                    </button>
                </div>

                <div className='py-6'>
                    {selectedTab === 'description' ? (
                        <div className='prose max-w-none'>
                            <p className='text-gray-600 leading-relaxed'>
                                {productData.description}
                            </p>
                            <p className='text-gray-600 leading-relaxed mt-4'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                Voluptatibus quasi similique expedita nemo architecto ducimus 
                                dignissimos dolorem deserunt dolor tempora.
                            </p>
                        </div>
                    ) : (
                        <div className='space-y-4'>
                            {/* Example Review */}
                            <div className='border-b pb-4'>
                                <div className='flex items-center gap-2 mb-2'>
                                    <div className='flex items-center'>
                                        {[...Array(5)].map((_, index) => (
                                            <img 
                                                key={index}
                                                src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                                                alt="star"
                                                className='w-4 h-4'
                                            />
                                        ))}
                                    </div>
                                    <span className='text-sm text-gray-500'>
                                        John D. - 2 months ago
                                    </span>
                                </div>
                                <p className='text-gray-600'>
                                    Great product! The quality is excellent and it fits perfectly.
                                </p>
                            </div>
                            {/* Add more reviews as needed */}
                        </div>
                    )}
                </div>
            </div>

            {/* Related Products */}
            <RelatedProducts 
                id={productData._id}
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </div>
    );
};

export default Product;