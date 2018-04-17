import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import * as api from '../../apiCalls';
import PropTypes from 'prop-types';
import './styles.css';

export class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      email: '',
      password: '',
      error: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.props.match.path === '/welcome/signup') {
      this.signUp();
    } else {
      this.logIn({email: this.state.email, password: this.state.password});
    }
  }

  signUp = async () => {
    const existingUsers = await api.fetchUsers();
    const validation = existingUsers.find(existingUser => 
      existingUser.email === this.state.email);

    if (validation) {
      this.setState({
        userName: '',
        email: '',
        password: '',
        error: 'This email already exists'
      });
    } else {
      const { userName, email, password } = this.state;
      const id = await api.addUser(this.state);
      const userObject = {
        userName,
        email,
        password,
        id
      };
      localStorage.setItem('Last User', JSON.stringify(userObject));
      this.props.captureUser(userObject);
      this.setState({
        userName: '',
        email: '',
        password: '',
        error: ''
      });
    }
  }

  logIn = async (credentials) => {
    try {
      const userInfo = await api.fetchOneUser(credentials);
      const userObject = {
        userName: userInfo.userName,
        email: userInfo.email,
        password: userInfo.password,
        id: userInfo.id
      };
      localStorage.setItem('Last User', JSON.stringify(userObject));
      this.props.captureUser(userObject);
      const userRaces = await api.getUserRaces(this.props.user.id);
      userRaces.forEach(race => this.props.addRace(race));
    } catch (error) {
      this.setState({
        email: '',
        password: '',
        error: 'Email and password do not match. Please try again!'
      });
    }
  }

  render() {
    return this.props.user ? <Redirect to='/' /> : (
      <div>
        <form onSubmit={this.handleSubmit}>
          {
            (this.props.match.path === '/welcome/signup') ?
              <h2>Please sign up to start tracking races</h2> :  
              <h2>Please log in to view your race log</h2> 
          }
          {
            (this.props.match.path === '/welcome/login') ? 
              (<p className='welcome-subtext'>Don't have an account? 
                <NavLink className='welcome-link' to='/welcome/signup'>
                  Sign Up
                </NavLink>
              </p>) :
              (<p className='welcome-text'>Have an account? 
                <NavLink className='welcome-link' to='/welcome/login'>
                  Log In
                </NavLink>
              </p>)
          }
          {
            (this.props.match.path === '/welcome/signup') &&
            <input type="text" 
              placeholder="Enter Name"
              name="userName"
              value={this.state.userName}
              onChange={this.handleChange}/>
          }
          <input type="email" 
            placeholder="Enter Email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}/>
          <input type="password"
            placeholder="Enter Password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}/>
          <button type="submit">Start Tracking</button>

          <p>{this.state.error}</p>
        </form>
      </div>
    );
  }
}

Welcome.propTypes = {
  user: PropTypes.object,
  captureUser: PropTypes.func,
  addRace: PropTypes.func,
  match: PropTypes.object
};

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user)),
  addRace: race => dispatch(actions.addRace(race))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Welcome));
