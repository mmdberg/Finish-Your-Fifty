import React from 'react';
import { shallow } from 'enzyme';
import App from './index';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />)
  });

  it.skip('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  });

});
