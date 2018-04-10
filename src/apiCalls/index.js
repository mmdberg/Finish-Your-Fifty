import { apiKey } from '../private/apiKey';
import { raceCleaner } from './cleaner'

export const fetchRaces = async (state) => { 
  try {
    const response 
      = await fetch(`/v2/search/?query=running&category=event&state=${state}&api_key=${apiKey}`,
        {
          type: 'GET',
          credentials: 'omit'
        });
    const raceInfo = await response.json();
    return raceCleaner(raceInfo.results);
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

export const fetchOneUser = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/v1/users/${id}`);
    const userInfo = await response.json();
    console.log(userInfo);
  } catch (error) {
    console.log(error);
  }
};

export const addUser = async (user) => {
  const response = await fetch('http://localhost:3000/api/v1/users', 
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

