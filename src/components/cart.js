import React from 'react'
import classNames from 'classnames'
import { useStore } from '../store/StoreContext'
import { types } from '../store/types'
import netlifyIdentity from 'netlify-identity-widget'

function Cart() {
  const [{ layout, cart }, dispatch] = useStore()

  return (
    <div
      className={classNames(
        'cart-container',
        layout.isCartOpen && 'cart-container-open',
      )}
    >
      {Object.values(cart.products).map(product => (
        <div key={product.slug}>
          {product.name} - {product.quantity} -{' '}
          {product.price * product.quantity}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              dispatch({
                type: types.DECREASE_QUANTITY,
                payload: { slug: product.slug },
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          dispatch({
            type: types.CHECKOUT,
            payload: cart.products,
          })
        }
      >
        Checkout
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => netlifyIdentity.open()}
      >
        Login
      </button>
    </div>
  )
}

export default Cart
