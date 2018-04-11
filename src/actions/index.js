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