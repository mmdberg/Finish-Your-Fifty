import { shallow } from 'enzyme';
import React from 'react';
import { AddRace, mapStateToProps, mapDispatchToProps } from './index';
import { mockCompletedRace, mockUser, mockRace } from '../../mocks';
import * as actions from '../../actions';
import * as api from '../../apiCalls';

describe('AddRace', () => {
  let wrapper;
  let mockAddRace;
  let mockClearSearchRace;

  beforeEach(() => {
    mockAddRace = jest.fn();
    mockClearSearchRace = jest.fn();
    wrapper = shallow(<AddRace 
      addRace={mockAddRace} 
      user={mockUser} 
      searchRace={{}}
      clearSearchRace={mockClearSearchRace}
    />);
  });

  it('should match snapshot without searchRace', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot with searchRace', () => {
    let wrapper = shallow(<AddRace 
      addRace={mockAddRace} 
      user={mockUser} 
      searchRace={mockRace}
      clearSearchRace={mockClearSearchRace}
    />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with empty state if no searchRace', () => {
    const expected = {
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: '',
      date: '',
      completed: 'Completed',
      error: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should start with searchRace info in state if it exists', () => {
    let wrapper = shallow(<AddRace 
      addRace={mockAddRace} 
      user={mockUser} 
      searchRace={mockRace}
      clearSearchRace={mockClearSearchRace}
    />);
    const expected = {
      raceName: 'Spooky 5k',
      distance: '',
      time: '',
      city: 'San Diego',
      state: 'CA',
      date: '04-05-2018',
      completed: 'Completed',
      error: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update state with user input on type', () => {
    const mockEvent =  {target: {name: 'time', value: '45'}};
    const expected = {
      raceName: '',
      distance: '',
      time: '45',
      city: '',
      state: '',
      date: '',
      completed: 'Completed',
      error: ''
    };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should send race to db with right params on submit', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.setState(mockCompletedRace);
    api.addRace = jest.fn().mockImplementation(() => Promise.resolve({id: 23}));

    await wrapper.instance().handleSubmit(mockEvent);
    expect(api.addRace).toHaveBeenCalledWith(mockCompletedRace, 23);
  });

  it('should send race to store with right params on submit', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.setState(mockCompletedRace);
    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockAddRace).toHaveBeenCalledWith(mockCompletedRace);
  });

  it('should call clearSearchRace on submit', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    await wrapper.instance().handleSubmit(mockEvent);
    expect(mockClearSearchRace).toHaveBeenCalled();
  });

  it('should reset state and update success message after submit', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.setState(mockCompletedRace);
    const expected = {
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: '',
      date: '',
      completed: 'Completed',
      error: 'Race Added!'
    };
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should send error message if unable to add race', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    api.addRace = jest.fn().mockImplementation(() => Promise.resolve({
      error: 'You are missing a raceName.'
    }));
    const expected = 'Unable to add race. You are missing a raceName.';
    wrapper.setState({
      distance: '',
      time: '',
      city: 'San Diego',
      state: 'CA',
      date: '04-05-2018',
      completed: 'Completed',
      error: ''
    });
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state('error')).toEqual(expected);
  });

  it('should update distance in state on dropdown change', () => {
    const mockEvent = {value: 'Marathon'};
    wrapper.instance().handleDropdownChange(mockEvent);
    expect(wrapper.state('distance')).toEqual('Marathon');
  });

  it('should clear state on clearFields', () => {
    wrapper.setState({
      raceName: 'SunTrust 10k',
      distance: '10k',
      time: '',
      city: '',
      state: 'FL',
      date: '',
      completed: 'Completed',
      error: ''
    });
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().clearFields(mockEvent);
    const expected = {
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: '',
      date: '',
      completed: 'Completed',
      error: ''
    };
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
      };
      let mapped = mapStateToProps(mockState);
      expect(mapped.user).toEqual(mockUser);
    });

    it('should correctly map searchRace to props', () => {
      let mockState = {
        searchRace: mockRace
      };
      let mapped = mapStateToProps(mockState);
      expect(mapped.searchRace).toEqual(mockRace);
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