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
      <main className="max-w-lg mx-auto py-10 px-5">{children}</main>
    </div>
  );
}

export default PageContent;
