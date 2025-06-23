import React from 'react';
import { useOrders } from '../Context/OrderContext';
import { useNavigate } from 'react-router-dom';
import Title from '../Components/Title';

const Orders = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div>
        {orders.map((order, index) => (
          <div key={index} className="order-item border-b py-4">
            <h3>Order #{index + 1}</h3>
            <p>Total: {order.total}</p>
            <p>Ordered by: {order.address.firstName} {order.address.lastName}</p>
            <p>Address: {order.address.street}, {order.address.city}, {order.address.state}, {order.address.zipcode}, {order.address.country}</p>
            <p>Phone: {order.address.phone}</p>
            <div className="flex gap-4 mt-4">
              {order.items.map((item) => (
                <div key={item._id} className="cursor-pointer" onClick={() => handleProductClick(item._id)}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className='w-20 h-20 object-cover rounded'
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;