import { types } from '../types';

export const initialState = {
  products: []
};

export const reducer = (state, action) => {
  switch (action.type) {
    case types.INCREMENT_QUANTITY:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case types.DECREASE_QUANTITY: {
      const index = state.products.findIndex(product => product.slug === action.payload.slug);
      const newProducts = [...state.products];
      newProducts.splice(index, 1);
      return {
        ...state,
        products: newProducts
      };
    }
    default:
      return state;
  }
};
