import React from 'react'
import { useStore } from '../store/StoreContext'
import classNames from 'classnames'
import Header from './header'

const PageContent = ({ children }) => {
  const [{ layout }] = useStore()

  return (
    <div
      className={classNames(
        'page-container',
        layout.isCartOpen && 'page-container-cart-open',
      )}
    >
      <Header />
      <main className="container mx-auto py-16 px-4 md:px-8">{children}</main>
    </div>
  )
}

export default PageContent
