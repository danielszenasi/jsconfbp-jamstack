import Header from './header';
import React from 'react';

function Layout({ children }) {
  return (
    <>
      <Header siteTitle="Supercharge Store"></Header>
      {children}
    </>
  );
}

export default Layout;
