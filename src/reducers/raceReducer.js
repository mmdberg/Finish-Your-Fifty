export const raceReducer = (state = [], actions) => {
  switch (actions.type) {
  case 'ADD_RACE':
    return [...state, actions.race];
  case 'REMOVE_RACE':
    return state.filter(race => race.event !== actions.race.event)
  default:
    return state;
  }
};