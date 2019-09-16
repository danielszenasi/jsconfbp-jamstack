import React from 'react';
import { StateProvider } from '../tools/state';
import { reducer as cartReducer, initialState as cartInitialState } from '../reducers/cart';
import { reducer as layoutReducer, initialState as layoutInitialState } from '../reducers/layout';
import PageContent from './page-content';
import Cart from './cart';

function Layout({ children }) {
  const mainReducer = ({ cart, layout }, action) => {
    console.log(cart, layout, action);
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
