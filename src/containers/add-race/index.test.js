import { shallow } from 'enzyme';
import React from 'react';
import { AddRace, mapStateToProps, mapDispatchToProps } from './index';
import { mockCompletedRace, mockUser } from '../../mocks';
import * as actions from '../../actions';

describe('AddRace', () => {
  let wrapper;
  let mockAddRace;
  let mockUser

  beforeEach(() => {
    mockAddRace = jest.fn();
    wrapper = shallow(<AddRace addRace={mockAddRace} user={mockUser}/>);
  });

  it.skip('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with empty state', () => {
    const expected = {
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: '',
      completed: 'true'
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
      completed: 'true'
    };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should call addRace with right params on submit', () => {
    const mockEvent = { preventDefault: jest.fn()};
    wrapper.setState(mockCompletedRace);
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockAddRace).toHaveBeenCalledWith({...mockCompletedRace, user_id: 23});
  });

  it('should reset state after submit', () => {
    const mockEvent = { preventDefault: jest.fn()};
    wrapper.setState(mockCompletedRace);
    const expected = {
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: ''
    };
    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  describe('mapStateToProps', () => {
    it.skip('should correctly map races to props', () => {
      let mockState = {
        races: [mockCompletedRace]
      };
      let mapped = mapStateToProps(mockState);
      expect(mapped.races).toEqual([mockCompletedRace]);
    });
  });

  describe('mapDispatchToProps', () => {
    let mockDispatch;
    let mapped;

    beforeEach(() => {
      mockDispatch = jest.fn();
      mapped = mapDispatchToProps(mockDispatch);
    });

    it('should call dispatch with right params on addRace', () => {
      const expected = actions.addRace(mockCompletedRace);
      mapped.addRace(mockCompletedRace);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });
  });
});