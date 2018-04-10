import React, { Component } from 'react';
import './styles.css';
import * as api from '../../apiCalls';
import { NavLink, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Search from '../../Components/Search';
import Welcome from '..//welcome';
import { AddRace } from '../add-race';
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
        <Switch>
          <Route exact path='/' render={() => 
            this.props.user ? <Search /> : <Redirect to='/welcome/login'/>
          }/>
          <Route exact path='/add-race' component={ AddRace } />
          <Route exact path='/search' component={ Search }/>
          <Route exact path='/welcome/login' component={ Welcome }/>
          <Route exact path='/welcome/signup' component={ Welcome }/>
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));