import { shallow } from 'enzyme';
import { RaceLog, mapStateToProps, mapDispatchToProps } from './index';
import { mockRace, mockUser } from '../../mocks';
import React from 'react';
import * as actions from '../../actions';

describe('RaceLog', () => {
  it('should match the snapshot', () => {
    let wrapper = shallow(<RaceLog races={[mockRace]}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should correctly map races to props', () => {
      const mockState = {
        races: [mockRace]
      };
      const mapped = mapStateToProps(mockState);
      expect(mapped.races).toEqual([mockRace]);
    });

    it('should correctly map user to props', () => {
      const mockState = {
        user: mockUser
      };
      const mapped = mapStateToProps(mockState);
      expect(mapped.user).toEqual(mockUser);
    });
  });

  describe('mapDispatchToProps', () => {
    it('should call dispatch with the correct params on removeRace', () => {
      const mockDispatch = jest.fn();
      const expected = actions.removeRace(mockRace);
      const mapped = mapDispatchToProps(mockDispatch);
      mapped.removeRace(mockRace);
      expect(mockDispatch).toHaveBeenCalledWith(expected);
    });
  });
});