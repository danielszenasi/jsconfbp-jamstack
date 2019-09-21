import React from 'react';
import { StateProvider } from '../store/StoreContext';
import { reducer as cartReducer, initialState as cartInitialState } from '../store/reducers/cart';
import {
  reducer as layoutReducer,
  initialState as layoutInitialState
} from '../store/reducers/layout';
import PageContent from './page-content';
import Cart from './cart';
import netlifyIdentity from 'netlify-identity-widget';

if (typeof window !== 'undefined') {
  netlifyIdentity.init();
  window.netlifyIdentity = netlifyIdentity;
}

function Layout({ children }) {
  const mainReducer = ({ cart, layout }, action) => {
    return {
      cart: cartReducer(cart, action),
      layout: layoutReducer(layout, action)
    };
  };

  const initialState = {
    cart: cartInitialState,
    layout: layoutInitialState
  };

  return (
    <StateProvider initialState={initialState} reducer={mainReducer}>
      <PageContent>{children}</PageContent>
      <Cart />
    </StateProvider>
  );
}

export default Layout;
