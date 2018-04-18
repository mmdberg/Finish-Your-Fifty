import { shallow } from 'enzyme';
import { StateMap, mapStateToProps } from './index';
import React from 'react';
import {mockCompletedRace} from '../../mocks';

describe('Map', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<StateMap races={[mockCompletedRace]}/>);
  });

  it('should match snapshot without races', () => {
    let wrapper = shallow(<StateMap races={[]}/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('should match snapshot with races', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with an empty state', () => {
    const expected = {
      raceInfo: '',
      textStyle: { left: 0,
        top: 0,
        display: 'none'
      },
      state: '',
      filter: '',
      stateNumber: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should set state on click if new state', () => {
    const expected = {
      raceInfo: 'You still need a race in CA.',
      textStyle: { left: 225,
        top: 145,
        display: 'inline'
      },
      state: 'CA',
      filter: '',
      stateNumber: ''
    };
    wrapper.setState({
      state: 'FL'
    });
    let mockEvent = 
      {target: {dataset: {name: 'CA'}}, clientX: 225, clientY: 145};
    wrapper.instance().handleStateClick(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should reset state on click if already clicked', () => {
    const expected = {
      raceInfo: '',
      textStyle: { left: 0,
        top: 0,
        display: 'none'
      },
      state: '',
      filter: '',
      stateNumber: ''
    };
    wrapper.setState({
      state: 'CA'
    });
    let mockEvent = 
      {target: {dataset: {name: 'CA'}}, clientX: 225, clientY: 145};
    wrapper.instance().handleStateClick(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should set state with race still needed if no match', () => {
    let mockEvent = 
      {target: {dataset: {name: 'CA'}}, clientX: 225, clientY: 145};
    wrapper.instance().handleStateClick(mockEvent);
    expect(wrapper.state('raceInfo')).toEqual('You still need a race in CA.');
  });

  it('should set state with race info if match', () => {
    let mockEvent = 
      {target: {dataset: {name: 'TN'}}, clientX: 225, clientY: 145};
    wrapper.instance().handleStateClick(mockEvent);
    expect(wrapper.state('raceInfo'))
      .not.toEqual('You still need a race in TN.');
  });

  it('should set state with filter', () => {
    const mockEvent = { value: 'Marathon'};
    wrapper.instance().handleDropdownChange(mockEvent);
    expect(wrapper.state('filter')).toEqual('Marathon');
  });

  describe('mapStateToProps', () => {
    it('should correctly map races to props', () => {
      const mockState = {
        races: mockCompletedRace
      };
      const mapped = mapStateToProps(mockState);
      expect(mapped.races).toEqual(mockCompletedRace);
    });
  });
});