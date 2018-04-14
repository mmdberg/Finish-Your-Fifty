import { shallow } from 'enzyme';
import { StateMap } from './index';
import React from 'react';

describe('Map', () => {

  it.skip('should match snapshot', () => {
    let wrapper = shallow(<StateMap />)
    expect(wrapper).toMatchSnapshot()
  });
});