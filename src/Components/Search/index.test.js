import Search from './index.js';
import { shallow } from 'enzyme';
import React from 'react';
import * as api from '../../apiCalls';
import { mockRace } from '../../mocks';

describe('Search', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Search />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with an empty state', () => {
    const expected = {
      state: '',
      year: '',
      results: [],
      error: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update state on user input', () => {
    const mockEvent = {target:{name: 'state', value: 'C'}};
    const expected = {
      state: 'C',
      year: '',
      results: [],
      error: ''
    };

    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should call fetchRaces with the right params on submit', () => {
    const mockEvent = { preventDefault: jest.fn()};
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve(
      [mockRace]
    ));
    wrapper.setState({year: '2018'});
    wrapper.instance().handleSubmit(mockEvent);
    expect(api.fetchRaces).toHaveBeenCalledWith('2018');
  });

  it('should set error message if there are no results', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    const expected = 'No races match your search criteria. Try again.';
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve([]));
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state('error')).toEqual(expected);
  });

  it('should set error message if results do not match state search', async () => {
    wrapper.setState({
      state: 'FL'
    })
    const mockEvent = { preventDefault: jest.fn() };
    const expected = 'No races match your search criteria. Try again.';
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve(
      [mockRace]));
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state('error')).toEqual(expected);
  });

  it('should set state if results match state search', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.setState({
      state: 'CA'
    })
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve(
      [mockRace]
    ));
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state('results')).toEqual([mockRace]);
  });

  it('should reset the state on clearSearch', () => {
    const expected = {
      state: '',
      year: '',
      results: [],
      error: ''
    };
    wrapper.setState({
      state: 'FL',
      results: [mockRace]
    });
    wrapper.instance().clearSearch();
    expect(wrapper.state()).toEqual(expected);
  });


});