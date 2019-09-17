export const applyMiddleware = dispatch => action => {
  dispatch(action);

  switch (action.type) {
    case 'changeTheme':
      break;
    default:
      return;
  }
};
