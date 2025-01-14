import React from 'react'
import { StateProvider } from '../store/StoreContext'
import {
  reducer as cartReducer,
  initialState as cartInitialState,
} from '../store/reducers/cart'
import {
  reducer as layoutReducer,
  initialState as layoutInitialState,
} from '../store/reducers/layout'

import {
  reducer as ordersReducer,
  initialState as ordersInitialState,
} from '../store/reducers/orders'

import PageContent from './page-content'
import Cart from './cart'
import netlifyIdentity from 'netlify-identity-widget'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

if (typeof window !== 'undefined') {
  netlifyIdentity.init()
  window.netlifyIdentity = netlifyIdentity
}

function Layout({ children }) {
  const {
    site: {
      siteMetadata: { title },
    },
  } = useStaticQuery(graphql`
    query TitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const mainReducer = ({ cart, layout, orders }, action) => {
    return {
      cart: cartReducer(cart, action),
      layout: layoutReducer(layout, action),
      orders: ordersReducer(orders, action),
    }
  }

  const initialState = {
    cart: cartInitialState,
    layout: layoutInitialState,
    orders: ordersInitialState,
  }

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageContent>{children}</PageContent>
      <Cart />
    </StateProvider>
  )
}

export default Layout
