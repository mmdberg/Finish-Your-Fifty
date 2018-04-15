export const searchRaceReducer = (state = {}, actions) => {
  switch(actions.type) {
    case 'ADD_SEARCH_RACE':
      return actions.race;
    case 'CLEAR_SEARCH_RACE':
      return {};
    default: 
      return state
  }
}