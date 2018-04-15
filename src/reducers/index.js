import { userReducer } from './userReducer';
import { raceReducer } from './raceReducer';
import { searchRaceReducer } from './searchRaceReducer';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  user: userReducer,
  races: raceReducer,
  searchRace: searchRaceReducer
});