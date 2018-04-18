import * as api from './index';
import { apiKey } from '../private/apiKey';
import { 
  mockApiResult, 
  mockCompletedRace, 
  mockUser, 
  mockRaceFromDB 
} from '../mocks';
import { raceCleaner } from './cleaner';

jest.mock('./cleaner');

describe('apiCalls', () => {

  describe('fetchRaces', () => {
    it('should call fetch with the right params', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockApiResult])
      }));
      const apiRoot = 'https://www.strava.com/api';
      const expected = 
        [`${apiRoot}/v3/running_races?year=2018&access_token=${apiKey}`,
          {
            type: 'GET',
            credentials: 'omit'
          }];
      api.fetchRaces('2018');
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should call raceCleaner with the right params', async () => {
      api.raceCleaner = jest.fn();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockApiResult])
      }));
      await api.fetchRaces('2018');
      expect(raceCleaner).toHaveBeenCalledWith([mockApiResult]);
    });

    it('should throw error message on error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject());
      const expected = new Error('Unable to get races');
      expect(api.fetchRaces('2018')).rejects.toEqual(expected);
    });
  });

  describe('Fetch Users', () => {
    it('should call fetch for users with the right params', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      }));
      const expected = 'http://localhost:3000/api/v1/users/';
      await api.fetchUsers();
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should throw error message on error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject());
      const expected = new Error('Unable to get users');
      expect(api.fetchUsers()).rejects.toEqual(expected);
    });

    it('should call fetch for one user with the right params', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({userCheck: {}})
      }));
      const mockCredentials = {
        email: 'taco@taco',
        password: 't'
      };
      const expected = ['http://localhost:3000/api/v1/users/', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
        headers: {
          'Content-Type': 'application/json' 
        }
      }];
      api.fetchOneUser(mockCredentials);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should throw error on error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({}));
      const expected = new Error('Unable to get user');
      const mockCredentials = {
        email: 'taco@taco',
        password: 't'
      };
      expect(api.fetchOneUser(mockCredentials)).rejects.toEqual(expected);
    });
  });

  describe('Add User', () => {
    it('should call fetch with the right params', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({id: 7})
      }));
      const expected = ['http://localhost:3000/api/v1/users/new', 
        {
          method: 'POST',
          body: JSON.stringify({
            userName: mockUser.userName,
            email: mockUser.email,
            password: mockUser.password
          }),
          headers: {
            'Content-Type': 'application/json' 
          }
        }];
      api.addUser(mockUser);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should throw error on error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.rejects());
      const expected = new Error('Unable to add user');
      expect(api.addUser(mockUser)).rejects.toEqual(expected);
    });
  });
  /*eslint-disable camelcase*/
  describe('Add Race', () => {
    it('should call fetch with the right params', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({id: 23})
      }));
      const mockRaceToAdd = {
        raceName: 'Hocus Marathon',
        city: 'Nashville',
        state: 'TN',
        time: '4:00:01',
        distance: 'Marathon',
        completed: 'Completed',
        date: '04-05-2018'
      };
      const expected = ['http://localhost:3000/api/v1/races', 
        {
          method: 'POST',
          body: JSON.stringify({...mockRaceToAdd, 
            user_id: 14
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }];
      api.addRace(mockCompletedRace, 14);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });
    /*eslint-enable camelcase*/
    it('should return error on error', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({
        error: 'You\'re missing a(n) raceName.'
      }));
      const mockRaceToAdd = {
        raceName: '',
        city: 'Nashville',
        state: 'TN',
        time: '4:00:01',
        distance: 'Marathon',
        completed: 'Completed',
        date: '04-05-2018'
      };
      const expected = {error: 'You\'re missing a(n) raceName.'};
      const result = await api.addRace(mockRaceToAdd, 14);
      expect(result).toEqual(expected);
    });
  });

  describe('getUserRaces', () => {
    it('should call fetch with the right params', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockRaceFromDB])
      }));
      const expected = 'http://localhost:3000/api/v1/races/23';
      api.getUserRaces(23);
      expect(window.fetch).toHaveBeenCalledWith(expected);
    });

    it('should throw error on error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject());
      const expected = new Error('Unable to get user\'s races');
      expect(api.getUserRaces(23)).rejects.toEqual(expected);
    });
  });

  describe('deleteRace', () => {
    it('should call fetch with the right params', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve());
      const expected = ['http://localhost:3000/api/v1/races/23', {
        method: 'DELETE'}];
      api.deleteRace(23);
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should throw error on error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject());
      const expected = new Error('Unable to delete race');
      expect(api.deleteRace(23)).rejects.toEqual(expected);
    });
  });
});


