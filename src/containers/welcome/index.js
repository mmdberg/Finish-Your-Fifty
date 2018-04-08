import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import * as actions from '../../actions';
import * as api from '../../apiCalls';

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
        console.log(this.props.match.path)
    this.setState({
      [name]: value
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault();


    const id = await api.addUser(this.state)
    this.props.captureUser(this.state, id)
  }

  render() {
    return(
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
          <button type="submit">Submit</button>
          {
            (this.props.match.path === '/welcome/login') ? 
            (<p>Don't have an account? 
              <NavLink to='/welcome/signup'>Sign Up</NavLink>
            </p>) :
            (<p>Have an account? 
              <NavLink to='/welcome/login'>Log In</NavLink>
            </p>)
          }
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user))
})

export default withRouter(connect(null, mapDispatchToProps)(Welcome))



