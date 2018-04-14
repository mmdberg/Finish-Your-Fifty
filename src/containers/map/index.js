import React, { Component } from 'react';
import USAMap from 'react-usa-map';
import './styles.css';
import { connect } from 'react-redux';

export class StateMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raceInfo: ''
    }
  }

  fillStates = () => {
    const stateArray = this.props.races.map(race => race.state)
    const stateObject = stateArray.reduce((stateObj, state) => {
      stateObj[state] = {fill:'magenta'}
      return stateObj
    }, {})
    return stateObject
  }

  handleStateClick = (event) => {
    this.setState({raceInfo: `You still need a race in ${event.target.dataset.name}.`})
    this.props.races.forEach(race => { 
      if (race.state === event.target.dataset.name) {
        this.setState({raceInfo: `${race.raceName} in ${race.city}, ${race.state}`})
      }
    }) 


  }

  
  render() {
    return (
      <div className='map'>
        <div className="raceInfo">
          <p>{this.state.raceInfo}</p>
        </div>
        <USAMap customize={this.props.races.length > 0 ? this.fillStates() : {}} onClick={this.handleStateClick}/>
      </div>
    );
  }

}

export const mapStateToProps = state => ({
  races: state.races
});

export default connect(mapStateToProps)(StateMap);