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
      await api.fetchRaces('CA');
      expect(raceCleaner).toHaveBeenCalledWith([mockApiResult]);
    });
  });
});