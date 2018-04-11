import { apiKey } from '../private/apiKey';
import { raceCleaner } from './cleaner'

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
    console.log('error:', error);
  }
};

export const fetchUsers = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/v1/users/');
    const users = await response.json();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const fetchOneUser = async (credentials) => {
  console.log(credentials)
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
    console.log('error at call', error);
  }
};

export const addUser = async (user) => {
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
};

