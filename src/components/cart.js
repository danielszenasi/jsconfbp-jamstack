import React from 'react';
import classNames from 'classnames';
import { useStore } from '../store/StoreContext';

function Cart() {
  const [{ layout }] = useStore();

  return (
    <div className={classNames('cart-container', { 'cart-container-open': layout.isCartOpen })}>
      Cart content
    </div>
  );
}

export default Cart;
