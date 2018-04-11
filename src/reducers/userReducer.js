export const userReducer = (state = null, actions) => {
  switch (actions.type) {
  case 'CAPTURE_USER':
    return actions.user;
  case 'LOG_OUT':
    return null;
  default: 
    return state;
  }
};