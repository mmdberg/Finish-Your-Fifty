import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect, withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import * as api from '../../apiCalls';

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
      this.props.captureUser({
        userName,
        email,
        password,
        id
      });
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
      const userInfo = await api.fetchOneUser(credentials)
      console.log(userInfo);
      this.props.captureUser({
        userName: userInfo.userName,
        email: userInfo.email,
        password: userInfo.password,
        id: userInfo.id
      })
    } catch (error) {
      console.log('in app', error)
      this.setState({
        email: '',
        password: '',
        error: 'Email and password do not match. Please try again!'
      })
    }
    //if unable to pull, alert that email does not exist, send to signup page
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
          {
            (this.props.match.path === '/welcome/login') ? 
              (<p>Don't have an account? 
                <NavLink to='/welcome/signup'>Sign Up</NavLink>
              </p>) :
              (<p>Have an account? 
                <NavLink to='/welcome/login'>Log In</NavLink>
              </p>)
          }
          <p>{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Welcome));
