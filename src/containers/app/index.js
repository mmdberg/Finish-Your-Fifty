import React, { Component } from 'react';
import './styles.css';
import * as api from '../../apiCalls';
import { NavLink, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Search from '../../Components/Search';
import Welcome from '..//welcome';
import AddRace from '../add-race';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class App extends Component {
  async componentDidMount () {
    // const races = await api.fetchOneUser(3)
    // console.log(races)
  }

  logOut = () => {
    console.log('working');
    this.props.logOut()
    //take user out of store
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h1 className='App-title'>Finish Your Fifty</h1>
          {
            this.props.user && <NavLink to='/' onClick={this.logOut}>Log Out</NavLink>
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
              this.props.user ? <Search /> : <Redirect to='/welcome/login'/>
            }/>
            <Route exact path='/add-race' component={ AddRace } />
            <Route exact path='/search' component={ Search }/>
            <Route exact path='/welcome/login' component={ Welcome }/>
            <Route exact path='/welcome/signup' component={ Welcome }/>
          </Switch>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  captureUser: user => dispatch(actions.captureUser(user)),
  logOut: () => dispatch(actions.logOut())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));