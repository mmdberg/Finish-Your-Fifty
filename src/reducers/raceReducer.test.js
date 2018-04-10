import { raceReducer } from './raceReducer';
import * as actions from '../actions';
import { mockCompletedRace } from '../mocks'

describe('Race Reducer', () => {
  it('should return the default state', () => {
    expect(raceReducer(undefined, {})).toEqual([])
  });

  it('should add race', () => {
    expect(raceReducer(undefined, actions.addRace(mockCompletedRace))).toEqual([mockCompletedRace])

  });
});