import { apiKey } from '../private/apiKey';
import { raceCleaner } from './cleaner';

export const fetchRaces = async (year) => { 
  try {
    const response 
      = await fetch(`https://www.strava.com/api/v3/running_races?year=${year}&access_token=${apiKey}`,
        {
          type: 'GET',
          credentials: 'omit'
        });
    const raceInfo = await response.json();
    return raceCleaner(raceInfo);
  } catch (error) {
    throw new Error('Unable to get races');
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/');
    const users = await response.json();
    return users;
  } catch (error) {
    throw new Error('Unable to get users');
  }
};

export const fetchOneUser = async (credentials) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/users/`,
      {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
          'Content-Type': 'application/json' 
        }
      });
    const userInfo = await response.json();
    return userInfo.userCheck;
  } catch (error) {
    throw new Error('Unable to get user');
  }
};

export const addUser = async (user) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/new', 
      {
        method: 'POST',
        body: JSON.stringify({
          userName: user.userName,
          email: user.email,
          password: user.password
        }),
        headers: {
          'Content-Type': 'application/json' 
        }
      });
    const userId = await response.json();
    return userId.id;
  } catch (error) {
    throw new Error('Unable to add user');
  }
};

export const addRace = async (raceInfo, user_id) => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/races', {
      method: 'POST',
      body: JSON.stringify({
        raceName: raceInfo.raceName,
        city: raceInfo.city,
        state: raceInfo.state,
        time: raceInfo.time,
        distance: raceInfo.distance,
        completed: raceInfo.completed,
        date: raceInfo.date,
        user_id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const raceId = await response.json();
    return raceId;
  } catch (error) {
    return error
  }
};

export const getUserRaces = async (user_id) => {
  try {
    const response = 
      await fetch(`http://localhost:3000/api/v1/races/${user_id}`);
    const userRaces = await response.json();
    return userRaces;
  } catch (error) {
    throw new Error('Unable to get user\'s races')
  }
};

export const deleteRace = async (raceId) => {
  try {
    await fetch(`http://localhost:3000/api/v1/races/${raceId}`, {
      method: 'DELETE'
    });
  } catch (error) {
    throw new Error('Unable to delete race')
  }
}

