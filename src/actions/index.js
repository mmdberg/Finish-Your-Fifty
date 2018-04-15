export const captureUser = (user) => ({
  type: 'CAPTURE_USER',
  user
});

export const addRace = (race) => ({
  type: 'ADD_RACE',
  race
});

export const logOut = () => ({
  type: 'LOG_OUT'
});

export const removeRace = (race) => ({
  type: 'REMOVE_RACE',
  race
});

export const clearRaces = () => ({
  type: 'CLEAR_RACES'
});

export const addSearchRace = (race) => ({
  type: 'ADD_SEARCH_RACE',
  race
});

export const clearSearchRace = () => ({
  type: 'CLEAR_SEARCH_RACE'
});