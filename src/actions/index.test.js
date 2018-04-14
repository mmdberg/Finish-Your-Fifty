import * as actions from './index';
import { mockUser, mockCompletedRace } from '../mocks';

describe('actions', () => {
  it('should return action type of CAPTURE_USER', () => {
    const user = mockUser;
    const expected = {
      type: 'CAPTURE_USER',
      user
    };
    expect(actions.captureUser(user)).toEqual(expected);
  });

  it('should return action type of ADD_RACE', () => {
    const race = mockCompletedRace;
    const expected = {
      type: 'ADD_RACE',
      race
    };
    expect(actions.addRace(race)).toEqual(expected);
  });

  it('should return action type of LOG_OUT', () => {
    const expected = {
      type: 'LOG_OUT'
    };
    expect(actions.logOut()).toEqual(expected);
  });

  it('should return action type of REMOVE_RACE', () => {
    const race = mockCompletedRace;
    const expected = {
      type: 'REMOVE_RACE',
      race
    };
    expect(actions.removeRace(race)).toEqual(expected);
  });
});