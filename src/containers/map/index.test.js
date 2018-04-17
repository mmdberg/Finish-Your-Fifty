import { shallow } from 'enzyme';
import { StateMap } from './index';
import React from 'react';
import {mockCompletedRace} from '../../mocks';

describe('Map', () => {

  it('should match snapshot', () => {
    let wrapper = shallow(<StateMap races={[mockCompletedRace]}/>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('mapStateToProps', () => {
    it('should correctly map races to props', () => {

    });
  });
});