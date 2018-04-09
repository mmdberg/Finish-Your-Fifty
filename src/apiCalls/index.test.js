import * as api from './index';
import { apiKey } from '../private/apiKey';
import { mockApiResult, mockRace } from '../mocks';

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

    it.skip('should call raceCleaner with the right params', async () => {
      api.raceCleaner = jest.fn();
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({results: [mockApiResult]})
      }));
      await api.fetchRaces('CA');
      expect(api.raceCleaner).toHaveBeenCalledWith([mockApiResult]);
    });

    it('should clean race data',  () => {

      expect(api.raceCleaner([mockApiResult])).toEqual([mockRace]);
    });

    it('should clean year data', () => {
      expect(api.dateCleaner('2018-04-05T08:00:00')).toEqual('04-05-2018');
    });

  });




});