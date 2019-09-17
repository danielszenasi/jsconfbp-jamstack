import { types } from './types';

export const applyMiddleware = dispatch => action => {
  dispatch(action);

  switch (action.type) {
    case types.CHECKOUT:
      fetch('/.netlify/functions/checkout', {
        method: 'post',
        body: JSON.stringify(action.payload)
      }).then(function(response) {
        console.log(response);
      });
      break;
    default:
      return;
  }
};
