import React from 'react';
import { useStore } from '../store/StoreContext';
import classNames from 'classnames';
import Header from './header';

function PageContent({ children }) {
  const [{ layout }] = useStore();

  return (
    <div
      className={classNames('page-container', { 'page-container-cart-open': layout.isCartOpen })}
    >
      <Header siteTitle="Supercharge Store"></Header>
      {children}
    </div>
  );
}

export default PageContent;
