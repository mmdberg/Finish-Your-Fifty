import { apiKey } from '../private/apiKey';

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

export const raceCleaner = (races) => {
  const cleanRaces = races.map(race => {
    return {
      venue: race.place.placeName,
      city: race.place.cityName,
      website: race.registrationUrlAdr,
      date: dateCleaner(race.activityStartDate),
      event: race.organization.organizationName
    };
  });
  return cleanRaces;
};

export const dateCleaner = (date) => {
  const dateOnly = date.split('').splice(0, 10);
  const yearOnly = dateOnly.splice(0, 5).splice(0, 4);
  const cleanDate = [...date.split('').splice(5, 5), '-', ...yearOnly].join('');
  return cleanDate;
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

