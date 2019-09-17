import React from 'react';
import classNames from 'classnames';
import { useStore } from '../store/StoreContext';
import { types } from '../store/types';

function Cart() {
  const [{ layout, cart }, dispatch] = useStore();

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
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          dispatch({
            type: types.CHECKOUT,
            payload: Object.keys(products)
              .map(k => products[k])
              .map(product => `${product.name} - ${product.quantity}`)
              .join(', ')
          })
        }
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart;
