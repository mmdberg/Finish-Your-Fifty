import React from 'react';
import { shallow } from 'enzyme';
import { App, mapStateToProps, mapDispatchToProps } from './index';
import mockUser from '../../mocks';
import * as actions from '../../actions';

describe('App', () => {
  let wrapper;
  let mockLogOut;

  beforeEach(() => {
    mockLogOut = jest.fn()
    wrapper = shallow(<App logOut={mockLogOut}/>);
  });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call logOut on logOut', () => {
    wrapper.instance().logOut()
    expect(mockLogOut).toHaveBeenCalled()
  });

  describe('mapStateToProps', () => {
    let mapped; 
    const mockState = {
      user: mockUser
    }

    beforeEach(() => {
      mapped = mapStateToProps(mockState)
    });

    it('correctly maps the user to props', () => {
      expect(mapped.user).toEqual(mockUser)
    });
  });

  describe('mapDispatchToProps', () => {
    let mockDispatch;
    let mapped; 

    beforeEach(() => {
      mockDispatch = jest.fn();
      mapped = mapDispatchToProps(mockDispatch)
    });

    it('should call dispatch with correct params on log out', () => {
      const expected = actions.logOut()
      mapped.logOut();
      expect(mockDispatch).toHaveBeenCalledWith(expected)
    });

  });

});
