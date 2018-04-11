import * as actions from '../actions';
import { userReducer } from './userReducer';
import { mockUser } from '../mocks';

describe('User Reducer', () => {
  it('should return default state', () => {
    expect(userReducer(undefined, {})).toEqual(null);
  });

  it('should add user to store', () => {
    expect(userReducer(undefined, actions.captureUser(mockUser)))
      .toEqual(mockUser);
  });

  it('should remove user from store', () => {
    expect(userReducer([mockUser], actions.logOut())).toEqual(null);
  });

});