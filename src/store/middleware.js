import { types } from './types';
import netlifyIdentity from 'netlify-identity-widget';

export const applyMiddleware = dispatch => action => {
  dispatch(action);

  switch (action.type) {
    case types.CHECKOUT: {
      const user = netlifyIdentity.currentUser();
      user
        .jwt()
        .then(token =>
          fetch('/.netlify/functions/orders', {
            method: 'post',
            body: JSON.stringify(action.payload),
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
          })
        )
        .then(function(response) {
          console.log(response);
        });
      break;
    }
    default:
      return;
  }
};
