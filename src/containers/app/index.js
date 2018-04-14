import React, { Component } from 'react';
import './styles.css';
import * as api from '../../apiCalls';
import { NavLink, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Search from '../../Components/Search';
import Welcome from '..//welcome';
import AddRace from '../add-race';
import RaceLog from '../RaceLog';
import { StateMap } from '../map';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

export class App extends Component {
  async componentDidMount () {
    const lastUser = JSON.parse(localStorage.getItem('Last User'));
    if (lastUser) {
      this.props.captureUser(lastUser);
      const userRaces = await api.getUserRaces(lastUser.id);
      userRaces.forEach(race => {
        this.props.addRace(race);
      });
    }
  }

  logOut = () => {
    this.props.logOut();
    this.props.clearRaces();
    localStorage.clear();
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Finish Your Fifty</h1>
          {
            this.props.user && 
            <div className='introduction'>
              <p>Hi {this.props.user.userName}!</p>
              <NavLink to='/' onClick={this.logOut}> Log Out</NavLink>
            </div>
          }
        </header>
        <nav>
          <NavLink className='nav-section nav1' to='/'>Home</NavLink>
          <NavLink className='nav-section nav2' to='/add-race'>Add Race</NavLink>
          <NavLink className='nav-section nav3' to='/race-log'>Race Log</NavLink>
          <NavLink className='nav-section nav4' to='/search'>Search</NavLink>
        </nav>
        <div className='app-body'>
          <Switch>
            <Route exact path='/' render={() => 
              this.props.user ? <StateMap /> : <Redirect to='/welcome/login'/>
            }/>
            <Route exact path='/add-race' render={() => this.props.user ? 
              <AddRace /> : <Redirect to='/welcome/login' /> } />
            <Route exact path='/race-log' render={() => this.props.user ? 
              <RaceLog /> : <Redirect to='/welcome/login' /> } />
            <Route exact path='/search' render={() => this.props.user ? 
              <Search /> : <Redirect to='/welcome/login' /> } />
            <Route exact path='/welcome/login' component={ Welcome }/>
            <Route exact path='/welcome/signup' component={ Welcome }/>
          </Switch>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  captureUser: PropTypes.func,
  addRace: PropTypes.func,
  logOut: PropTypes.func,
  clearRaces: PropTypes.func
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user)),
  addRace: race => dispatch(actions.addRace(race)),
  logOut: () => dispatch(actions.logOut()),
  clearRaces: () => dispatch(actions.clearRaces())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));