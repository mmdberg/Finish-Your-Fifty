import * as api from './index';
import { apiKey } from '../private/apiKey';
import { mockApiResult, mockRace } from '../mocks';
import { raceCleaner } from './cleaner';

jest.mock('./cleaner')

describe('apiCalls', () => {

  describe('fetchRaces', () => {
    it('should call fetch with the right params', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve([mockApiResult])
      }));
      const expected = 
        [`https://www.strava.com/api/v3/running_races?year=2018&access_token=${apiKey}`,
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
      window.fetch = jest.fn().mockImplementation(() => Promise.reject())
      const expected = new Error('Unable to get races')
      // await api.fetchRaces('2018')
      expect(api.fetchRaces('2018')).rejects.toEqual(expected)
    });
  });

  describe('Fetch Users', () => {
    it('should call fetch for users with the right params', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      }));
      const expected = 'http://localhost:3000/api/v1/users/'
      await api.fetchUsers();
      expect(window.fetch).toHaveBeenCalledWith(expected)
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
      }
      const expected = ['http://localhost:3000/api/v1/users/', {
        method: 'POST',
        body: JSON.stringify(mockCredentials),
        headers: {
          'Content-Type': 'application/json' 
        }
      }];
      api.fetchOneUser(mockCredentials)
      expect(window.fetch).toHaveBeenCalledWith(...expected)
    });

    it('should throw error on error', () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.reject({}))
      const expected = new Error('Unable to get user')
      const mockCredentials = {
        email: 'taco@taco',
        password: 't'
      }
      expect(api.fetchOneUser(mockCredentials)).rejects.toEqual(expected);
    });
  });

  describe('Add User', () => {
    it('should call fetch with the right params', () => {

    });
  });
});

























