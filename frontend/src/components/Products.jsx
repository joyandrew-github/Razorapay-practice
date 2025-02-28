import React from 'react';
import '../styles/Products.css';
import axios from 'axios';

function Products({ products }) {
  const checkoutHandler = async (amount) => {
    try {
      const { data: keyData } = await axios.get('/api/v1/getKey');
      const { key } = keyData;

   
      const { data: orderData } = await axios.post('/api/v1/payment/process', {
        amount,
      });
      const { order } = orderData;

      const options = {
        key,
        amount: order.amount, 
        currency: 'INR',
        name: 'Joyandrew',
        description: 'Razorpay Integration',
        order_id: order.id,
        callback_url: '/api/v1/paymentVerification', 
        prefill: {
          name: 'Joyandrew',
          email: 'joyandrew006@gmail.com',
          contact: '7806895713',
        },
        theme: {
          color: '#F37254',
        },
      };


      const rzp = new Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error('Payment processing error:', error);
    }
  };

  return (
    <div className="products-container">
      {products.map((item) => (
        <div className="product-card" key={item.id}>
          <img src={item.image} alt={item.title} className="product-image" />
          <h3 className="product-title">{item.title}</h3>
          <p className="product-price">
            Price <strong>{item.price}</strong>/-
          </p>
          <button
            className="pay-button"
            onClick={() => checkoutHandler(item.price)}
          >
            Pay({item.price})/-
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
