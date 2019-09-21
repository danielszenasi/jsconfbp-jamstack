import React, { useEffect, useState } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

function Orders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const user = netlifyIdentity.currentUser();
    user
      .jwt()
      .then(token =>
        fetch('/.netlify/functions/orders', {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        })
      )
      .then(response => response.json())
      .then(function(response) {
        console.log(response);

        setOrders(response.map(item => ({ ...item.data, id: item.ref['@ref'].id })));
      });
  }, []);
  return orders.map(order => (
    <div key={order.id}>
      {order.products.map(product => (
        <div key={product.slug}>
          {product.name}, ${product.price} - {product.quantity}
        </div>
      ))}
    </div>
  ));
}

export default Orders;
