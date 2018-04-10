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
        json: () => Promise.resolve({results: [mockApiResult]})
      }));
      const expected = 
        [`/v2/search/?query=running&category=event&state=CA&api_key=${apiKey}`,
          {
            type: 'GET',
            credentials: 'omit'
          }];
      api.fetchRaces('CA');
      expect(window.fetch).toHaveBeenCalledWith(...expected);
    });

    it('should call raceCleaner with the right params', async () => {
      api.raceCleaner = jest.fn();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({results: [mockApiResult]})
      }));
      await api.fetchRaces('CA');
      expect(raceCleaner).toHaveBeenCalledWith([mockApiResult]);
    });
  });
});