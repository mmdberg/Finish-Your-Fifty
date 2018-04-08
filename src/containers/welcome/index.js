import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.captureUser(this.state)
  }

  render() {
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" 
            placeholder="Enter Name"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}/>
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
        </form>
      </div>
    )
  }
}

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user))
})

export default connect(null, mapDispatchToProps)(Welcome)



