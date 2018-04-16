import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './index';
import { mockUser, mockApiResult, mockRace, mockRaceFromDB, mockCompletedRace } from '../../mocks';
import * as actions from '../../actions';
import { LocalStorage } from '../../__test-helper__/storageMock';

window.localStorage = new LocalStorage();

describe('App', () => {
  let wrapper;
  let mockLogOut;
  let mockCaptureUser;
  let mockAddRace;
  let mockClearRaces;

  beforeEach(() => {
    mockLogOut = jest.fn();
    mockCaptureUser = jest.fn();
    mockAddRace = jest.fn();
    mockClearRaces = jest.fn();
    wrapper = shallow(<App 
      logOut={mockLogOut} 
      captureUser={mockCaptureUser} 
      addRace={mockAddRace}
      clearRaces={mockClearRaces} />,
      { disableLifecycleMethods: true });

  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('local storage', () => {
    beforeEach(() => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => ([mockRaceFromDB])
      }));
      localStorage.setItem('Last User', JSON.stringify(mockUser));
    });
    
    it('should call capture user if user is in local storage', () => {
      wrapper.instance().componentDidMount()
      expect(mockCaptureUser).toHaveBeenCalledWith(mockUser)
    });

    it('should make fetch with the right params', () => {
      wrapper.instance().componentDidMount();
      expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/api/v1/races/23');
    });

  //SKIPPED TEST

    it.skip('should call addRace for user\'s races', () => {
      wrapper.instance().componentDidMount();
      expect(mockAddRace).toHaveBeenCalledWith(mockRaceFromDB)
    });
  });

  it('should call logOut on logOut', () => {
    wrapper.instance().logOut();
    expect(mockLogOut).toHaveBeenCalled();
  });

  it('should clear races on logOut', () => {
    wrapper.instance().logOut();
    expect(mockClearRaces).toHaveBeenCalled();
  });

  it('should clear local storage on logOut', () => {
    localStorage.setItem('Last User', JSON.stringify(mockUser));
    wrapper.instance().logOut();
    const lastUser = localStorage.getItem('Last User');
    expect(lastUser).not.toBeDefined();    

  });

  describe('mapStateToProps', () => {
    let mapped; 
    const mockState = {
      user: mockUser
    };

    beforeEach(() => {
      mapped = mapStateToProps(mockState);
    });

    it('correctly maps the user to props', () => {
      expect(mapped.user).toEqual(mockUser);
    });
  });

  describe('mapDispatchToProps', () => {
    let mockDispatch;
    let mapped; 

    beforeEach(() => {
      mockDispatch = jest.fn();
      mapped = mapDispatchToProps(mockDispatch);
    });

    it('should call dispatch with correct params on log out', () => {
      const expected = actions.logOut();
      mapped.logOut();
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });

    it('should call dispatch with the correct params on captureUser', () => {
      const expected = actions.captureUser(mockUser);
      mapped.captureUser(mockUser);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });

    it('should call dispatch with the correct params on addRace', () => {
      const expected = actions.addRace(mockCompletedRace);
      mapped.addRace(mockCompletedRace);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });

    it('should call dispatch with the correct params on clearRaces', () => {
      const expected = actions.clearRaces();
      mapped.clearRaces();
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });

  });

});
