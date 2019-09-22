import React, { useEffect } from 'react'
import netlifyIdentity from 'netlify-identity-widget'
import { navigate } from 'gatsby'
import { useStore } from '../store/StoreContext'
import { types } from '../store/types'

function Orders() {
  const [{ orders }, dispatch] = useStore()

  useEffect(() => {
    const user = netlifyIdentity.currentUser()
    if (!user) {
      navigate('/')
    }
    dispatch({ type: types.LOAD_ORDER_HISTORY })
  }, [])

  const items = orders.history.map(order => (
    <div className="mt-4 p-8 shadow-lg" key={order.id}>
      {Object.values(order.products).map(product => (
        <div
          key={product.slug}
          className="flex justify-between items-center mt-1 pb-1 border-b-2 border-gray-200 last:border-b-0"
        >
          <div>
            <div>{product.name}</div>
            <div>€{product.price}</div>
          </div>
          {product.quantity}
        </div>
      ))}
    </div>
  ))

  return (
    <div className="max-w-md m-auto">
      <h1 className="text-2xl font-bold">Your Orders History</h1>
      <div>{items}</div>
    </div>
  )
}

export default Orders
