export const initialState = {
  isCartOpen: false
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'toggleCart':
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };

    default:
      return state;
  }
};
