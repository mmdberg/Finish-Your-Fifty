export const raceReducer = (state = [], actions) => {
  switch (actions.type) {
  case 'ADD_RACE':
    return [...state, actions.race];
  case 'REMOVE_RACE':
    return state.filter(race => race.raceName !== actions.race.raceName);
  case 'CLEAR_RACES':
    return [];
  default:
    return state;
  }
};