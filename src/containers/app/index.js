import React, { Component } from 'react';
import './styles.css';
import * as api from '../../apiCalls';
import { NavLink, Route } from 'react-router-dom';
import Search from '../../Components/Search';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class App extends Component {
  async componentDidMount () {
    // const races = await api.fetchOneUser(3)
    // console.log(races)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Finish Your Fifty</h1>
        </header>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/add-race'>Add Race</NavLink>
          <NavLink to='/race-log'>Race Log</NavLink>
          <NavLink to='/search'>Search</NavLink>
        </nav>
        <Route path='/search' component={Search}/>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
})

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);