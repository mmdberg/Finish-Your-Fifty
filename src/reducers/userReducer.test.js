import * as actions from '../actions';
import { userReducer } from './userReducer';
import { mockUser } from '../mocks';

describe('User Reducer', () => {
  it('should return default state', () => {
    expect(userReducer(undefined, {})).toEqual(null)
  });

  it('should update user', () => {
    expect(userReducer(undefined, actions.captureUser(mockUser))).toEqual(mockUser)
  });


});