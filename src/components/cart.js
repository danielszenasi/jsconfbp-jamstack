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
      <div className="text-right">
        <button
          className="w-8"
          onClick={() =>
            dispatch({
              type: types.TOGGLE_CART,
            })
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M437.5 386.6L306.9 256l130.6-130.6c14.1-14.1 14.1-36.8 0-50.9-14.1-14.1-36.8-14.1-50.9 0L256 205.1 125.4 74.5c-14.1-14.1-36.8-14.1-50.9 0-14.1 14.1-14.1 36.8 0 50.9L205.1 256 74.5 386.6c-14.1 14.1-14.1 36.8 0 50.9 14.1 14.1 36.8 14.1 50.9 0L256 306.9l130.6 130.6c14.1 14.1 36.8 14.1 50.9 0 14-14.1 14-36.9 0-50.9z" />
          </svg>
        </button>
      </div>
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
