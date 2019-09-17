import React from 'react';
import classNames from 'classnames';
import { useStore } from '../store/StoreContext';

function Cart() {
  const [{ layout, cart }] = useStore();

  const products = cart.products.reduce((aggregated, product) => {
    if (aggregated[product.slug]) {
      return {
        ...aggregated,
        [product.slug]: { ...product, quantity: aggregated[product.slug].quantity + 1 }
      };
    }
    return { ...aggregated, [product.slug]: { ...product, quantity: 1 } };
  }, {});

  return (
    <div className={classNames('cart-container', { 'cart-container-open': layout.isCartOpen })}>
      {Object.keys(products)
        .map(k => products[k])
        .map(product => (
          <div>
            {product.name} - {product.quantity}
          </div>
        ))}
    </div>
  );
}

export default Cart;
