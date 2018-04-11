import { shallow } from 'enzyme';
import { Welcome } from './index';
import React from 'react';
import * as api from '../../apiCalls';
// import { mockUser } from '../../mocks';

jest.mock('../../apiCalls');

describe('Welcome', () => {
  let wrapper;
  let mockMatch;
  let mockCaptureUser;

  beforeEach(() => {
    mockMatch = {path: '/welcome/signup'};
    mockCaptureUser = jest.fn();
    wrapper = shallow(<Welcome 
      match={mockMatch}
      captureUser={mockCaptureUser}/>);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should start with an empty state', () => {
    const expected = {
      userName: '',
      email: '',
      password: '',
      error: ''
    };
    expect(wrapper.state()).toEqual(expected);
  });

  it('should update state with user input', () => {
    const mockEvent = {target: {name: 'email', value: 'todd@todd'}};
    const expected = {
      userName: '',
      email: 'todd@todd',
      password: '',
      error: ''
    };

    wrapper.instance().handleChange(mockEvent);
    expect(wrapper.state()).toEqual(expected);
  });

  it('should call signUp if submit is clicked on signup page', () => {
    const mockEvent = { preventDefault: jest.fn() };
    wrapper.instance().signUp = jest.fn();

    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.instance().signUp).toHaveBeenCalled();
  });

  it('should call logIn if submit is clicked on login page', () => {
    const mockEvent = { preventDefault: jest.fn() };
    const mockMatch= { path: '/welcome/login' };
    let wrapper = shallow(<Welcome match={mockMatch}/>);
    wrapper.instance().logIn = jest.fn();

    wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.instance().logIn).toHaveBeenCalled();
  });

  describe('signup', () => {
    it('should call fetchUsers on signup', async () => {
      await wrapper.instance().signUp();
      expect(api.fetchUsers).toHaveBeenCalled();
    });

    it('should clear inputs and set error state if email exists', async () => {
      const expected = {
        userName: '',
        email: '',
        password: '',
        error: 'This email already exists'
      };
      wrapper.setState({
        email: 'pizza@pizza'
      });
      await wrapper.instance().signUp();
      expect(wrapper.state()).toEqual(expected);
    });

    it('should call addUser with right params if new user', async () => {
      const expected = {
        userName: 'taco',
        email: 'taco@taco',
        password: 't',
        error: ''
      }
      wrapper.setState({
        userName: 'taco',
        email: 'taco@taco',
        password: 't'
      });

      await wrapper.instance().signUp();
      expect(api.addUser).toHaveBeenCalledWith(expected);
    });

    it('should call captureUser if new', async () => {
      const expected = {
        userName: 'taco',
        email: 'taco@taco',
        password: 't',
        id: 1
      }
      wrapper.setState({
        userName: 'taco',
        email: 'taco@taco',
        password: 't'
      });
      await wrapper.instance().signUp();
      expect(mockCaptureUser).toHaveBeenCalledWith(expected);
      //add right params
    });

    it('should reset state if new user', async () => {
      const expected = {
        userName: '',
        email: '',
        password: '',
        error: ''
      };
      wrapper.setState({
        userName: 'taco',
        email: 'taco@taco',
        password: 't'
      });
      await wrapper.instance().signUp();
      expect(wrapper.state()).toEqual(expected);
    });
  });

  describe('LogIn', () => {
    it('should set error state if email and password do not match', async () => {
      const expected = {
        userName: '',
        email: '',
        password: '',
        error: 'Email and password do not match. Please try again!'
      }
      await wrapper.instance().logIn({
        email: 'p@p',
        password: 'p'
      })
      expect(wrapper.state()).toEqual(expected)

    });

    it('should fetch user info with the right params', async () => {
      const mockCredentials = {
        email: 'pizza@pizza',
        password: 'p'
      }
      await wrapper.instance().logIn(mockCredentials);
      expect(api.fetchOneUser).toHaveBeenCalledWith(mockCredentials)
    });

    it('should call capture user', async () => {
      const mockCredentials = {
        email: 'pizza@pizza',
        password: 'p'
      }

      await wrapper.instance().logIn(mockCredentials);

      expect(mockCaptureUser).toHaveBeenCalledWith({    
        id: 7,
        userName: 'Pizza',
        email: 'pizza@pizza',
        password: 'p'
      })
    });
  });

});