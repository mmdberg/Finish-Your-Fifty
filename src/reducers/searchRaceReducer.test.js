import { searchRaceReducer } from './searchRaceReducer';
import * as actions from '../actions';
import {mockRace} from '../mocks';

describe('searchRaceReducer', () => {
  it('should return the default value', () => {
    expect(searchRaceReducer(undefined, {})).toEqual({})
  });

  it('should return a race to state', () => {
    expect(searchRaceReducer(undefined, actions.addSearchRace(mockRace))).toEqual(mockRace)
  });

  it('should clear race from state', () => {
    expect(searchRaceReducer(mockRace, actions.clearSearchRace())).toEqual({})
  })
});