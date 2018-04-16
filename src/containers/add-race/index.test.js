import { shallow } from 'enzyme';
import React from 'react';
import { AddRace, mapStateToProps, mapDispatchToProps } from './index';
import { mockCompletedRace, mockUser, mockRace } from '../../mocks';
import * as actions from '../../actions';
import * as api from '../../apiCalls';

describe('AddRace', () => {
  let wrapper;
  let mockAddRace;

  beforeEach(() => {
    mockAddRace = jest.fn();
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({id: 23})
    }));
    wrapper = shallow(<AddRace addRace={mockAddRace} user={mockUser}/>);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with empty state', () => {
    const expected = {
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: '',
      completed: 'true',
      error: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update state with user input', () => {
    const mockEvent =  {target: {name: 'time', value: '45'}};
    const expected = {
      raceName: '',
      distance: '',
      time: '45',
      city: '',
      state: '',
      completed: 'true',
      error: ''
    };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it.skip('should send race to db with right params on submit', () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.setState(mockCompletedRace);
    api.addRace = jest.fn()

    wrapper.instance().handleSubmit(mockEvent);
    expect(api.addRace).toHaveBeenCalledWith(mockCompletedRace, 23)
  });

  it('should send race to store with right params on submit', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.setState(mockCompletedRace);
    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockAddRace).toHaveBeenCalledWith(mockCompletedRace);
  });

  it('should reset state and update error after submit', () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.setState(mockCompletedRace);
    const expected = {
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: '',
      completed: 'true',
      error: 'Race Added!'
    };
    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  describe('mapStateToProps', () => {
    it('should correctly map races to props', () => {
      let mockState = {
        races: [mockCompletedRace]
      };
      let mapped = mapStateToProps(mockState);
      expect(mapped.races).toEqual([mockCompletedRace]);
    });

    it('should correctly map user to props', () => {
      let mockState = {
        user: mockUser
      }
      let mapped = mapStateToProps(mockState);
      expect(mapped.user).toEqual(mockUser);
    });

    it('should correctly map searchRace to props', () => {
      let mockState = {
        searchRace: mockRace
      }
      let mapped = mapStateToProps(mockState)
      expect(mapped.searchRace).toEqual(mockRace)
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with right params on addRace', () => {
      let mockDispatch = jest.fn();
      let mapped = mapDispatchToProps(mockDispatch);
      const expected = actions.addRace(mockCompletedRace);
      mapped.addRace(mockCompletedRace);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });
  });
});