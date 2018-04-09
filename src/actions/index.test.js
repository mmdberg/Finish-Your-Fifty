import * as actions from './index';
import { mockUser } from '../mocks';

describe('actions', () => {
  it('should return action type of CAPTURE_USER', () => {
    const user = mockUser;
    const expected = {
      type: 'CAPTURE_USER',
      user
    };
    expect(actions.captureUser(user)).toEqual(expected);
  });
});