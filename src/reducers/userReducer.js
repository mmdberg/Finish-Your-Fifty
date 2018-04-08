import * as actions from '../actions';

export const userReducer = (state = null, actions) => {
  switch (actions.type) {
    case 'CAPTURE_USER':
      return actions.user
    default: 
      return state
  }
}