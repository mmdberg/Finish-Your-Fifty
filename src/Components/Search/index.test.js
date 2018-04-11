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
      results: [],
      error: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update state on user input', () => {
    const mockEvent = {target:{name: 'state', value: 'C'}};
    const expected = {
      state: 'C',
      results: [],
      error: ''
    };

    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should call fetchRaces with the right params on submit', () => {
    const mockEvent = { preventDefault: jest.fn()};
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve(
      mockRace
    ));
    wrapper.setState({state: 'CA'});
    wrapper.instance().handleSubmit(mockEvent);
    expect(api.fetchRaces).toHaveBeenCalledWith('CA');
  });

  it('should set error message if there are no results', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    const expected = 'No races match your search criteria. Try again.';
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve([]));
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state('error')).toEqual(expected);
  });

  it('should call displayResults with right params if results', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().displayResults = jest.fn();
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve(
      [mockRace]
    ));
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.instance().displayResults).toHaveBeenCalledWith([mockRace]);
  });

  it('should set state of results with jsx on submit after fetch', () => {
    const expected = 
      [<tr key='0'>
        <td>Spooky 5k</td>
        <td>San Diego</td>
        <td>04-05-2018</td>
        <td>Atlas Park</td>
      </tr>];
    wrapper.instance().displayResults([mockRace]);
    expect(wrapper.state('results')).toEqual(expected);
  });

  it('should reset the state', () => {
    const expected = {
      state: '',
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