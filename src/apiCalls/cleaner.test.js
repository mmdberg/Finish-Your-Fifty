import * as cleaner from './cleaner';
import { mockApiResult, mockRace } from '../mocks';

describe('Race Cleaners', () => {
  it('should clean race data',  () => {
    expect(cleaner.raceCleaner([mockApiResult])).toEqual([mockRace]);
  });

  it('should clean year data', () => {
    expect(cleaner.dateCleaner('2018-04-05T08:00:00')).toEqual('04-05-2018');
  });

});