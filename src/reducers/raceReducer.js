export const raceReducer = (state = [], actions) => {
  switch (actions.type) {
  case 'ADD_RACE':
    return [...state, actions.race];
  default:
    return state;
  }
};