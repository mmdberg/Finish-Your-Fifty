import { apiKey } from '../private/apiKey';

const root = 'http://api.amp.active.com/search?'



export const fetchRaces = async () => { 
  try {
    const response 
      = await fetch('/v2/search/?query=running&category=event&state=CA&api_key=7nrprb2b7e28bsvftb9nr8mr',
      {
        type: 'GET',
        credentials: 'omit'
      }) 
    const raceInfo = await response.json()
    console.log('raceInfo:', raceInfo)
    } catch (error) {
      console.log('error:', error)
    }
} 

export const fetchUser = async () => {
  try{
    const response = await fetch('/users/v1/users')
    console.log(response)
    // const user = await response.json()
    // return user
  } catch (error) {
    console.log(error)
  }
}


  // "proxy": "http://api.amp.active.com",
