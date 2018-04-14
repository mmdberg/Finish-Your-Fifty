import { shallow } from 'enzyme';
import React from 'react';
import { AddRace, mapStateToProps, mapDispatchToProps } from './index';
import { mockCompletedRace } from '../../mocks';
import * as actions from '../../actions';

describe('AddRace', () => {
  let wrapper;
  let mockAddRace = jest.fn();

  beforeEach(() => {
    wrapper = shallow(<AddRace addRace={mockAddRace}/>);
  });

  it.skip('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with empty state', () => {
    const expected = {
      event: '',
      distance: '',
      time: '',
      city: '',
      state: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update state with user input', () => {
    const mockEvent =  {target: {name: 'time', value: '45'}};
    const expected = {
      event: '',
      distance: '',
      time: '45',
      city: '',
      state: ''
    };
    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should call addRace with right params on submit', () => {
    const mockEvent = { preventDefault: jest.fn()};
    wrapper.setState(mockCompletedRace);
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockAddRace).toHaveBeenCalledWith(mockCompletedRace);
  });

  it('should reset state after submit', () => {
    const mockEvent = { preventDefault: jest.fn()};
    wrapper.setState(mockCompletedRace);
    const expected = {
      event: '',
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