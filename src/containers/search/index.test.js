import { Search, mapStateToProps, mapDispatchToProps } from './index.js';
import { shallow } from 'enzyme';
import React from 'react';
import * as api from '../../apiCalls';
import { mockRace } from '../../mocks';
import * as actions from '../../actions';

describe('Search', () => {
  let wrapper;
  let mockAddSearchRace;

  beforeEach(() => {
    mockAddSearchRace = jest.fn();
    wrapper = shallow(<Search 
      searchRace={mockRace} 
      addSearchRace={mockAddSearchRace}/>);
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

  it('should update state on user input on type', () => {
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

  it('should set error message if no results match input', async () => {
    wrapper.setState({
      state: 'FL'
    });
    const mockEvent = { preventDefault: jest.fn() };
    const expected = 'No races match your search criteria. Try again.';
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve(
      [mockRace]));
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state('error')).toEqual(expected);
  });

  it('should call makeRaceList if there are results', async () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.setState({
      state: 'CA'
    });
    wrapper.instance().makeRaceList = jest.fn();
    api.fetchRaces = jest.fn().mockImplementation(() => Promise.resolve(
      [mockRace]
    ));
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.instance().makeRaceList).toHaveBeenCalledWith([mockRace]);

  });

  it('should call addSearchRace when adding interested race', async () => {
    wrapper.instance().addInterestedRace(mockRace);
    expect(mockAddSearchRace).toHaveBeenCalledWith(mockRace);
  });

  it('should update state with results', () => {
    wrapper.instance().makeRaceList([mockRace]);

    expect(wrapper.state('results')).not.toEqual([]);
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

  describe('mapStateToProps', () => {
    it('should correctly map searchRace to props', () => {
      const mockState = {
        searchRace: mockRace
      };
      const mapped = mapStateToProps(mockState);
      expect(mapped.searchRace).toEqual(mockRace);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params for addSearchRace', () => {
      const expected = actions.addSearchRace(mockRace);
      const mockDispatch = jest.fn();
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.addSearchRace(mockRace);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });
  });


});