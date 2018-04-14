import React, { Component } from 'react';
import USAMap from 'react-usa-map';
import './styles.css';
import { connect } from 'react-redux';

export class StateMap extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     stateObject: {}
  //   }
  // }

  // componentDidUpdate() {
  //   this.captureStates()
  // }

  // captureStates = () => {
  //   const stateArray = this.props.races.map(race => race.state)
  //   const stateObject = stateArray.reduce((stateObj, state) => {
  //     stateObj[state] = {fill:'magenta'}
  //     return stateObj
  //   }, {})
  // }

  fillStates = () => {
    console.log('hi')
    const stateArray = this.props.races.map(race => race.state)
    const stateObject = stateArray.reduce((stateObj, state) => {
      stateObj[state] = {fill:'magenta'}
      return stateObj
    }, {})
    return stateObject
  }

  handleStateClick = (event) => {
    console.log(event.target.dataset.name);
  }
  
  render() {
    console.log(this.props)
    return (
      <div className='map'>
        <USAMap customize={this.props.races.length > 0 ? this.fillStates() : {}} onClick={this.handleStateClick}/>
      </div>
    );
  }

}

export const mapStateToProps = state => ({
  races: state.races
});

export default connect(mapStateToProps)(StateMap);