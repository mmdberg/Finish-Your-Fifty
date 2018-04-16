import React, { Component } from 'react';
import USAMap from 'react-usa-map';
import './styles.css';
import { connect } from 'react-redux';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export class StateMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raceInfo: '',
      textStyle: { left: 0,
      top: 0,
      display: 'none'
      },
      state: '',
      filter: '',
      stateNumber: ''
    }
  }

  fillStates = (filter) => {
    const stateArray = this.props.races.map(race => {
      if(filter && filter !== 'See All Races' && race.completed === 'true') {
        if (race.distance === filter) {
          return race.state
        } else {
          return ''
        }
      } else if (race.completed === 'true') {
        return race.state
      }
    })
    const colors = {
      '': 'rgba(144, 63, 63, 0.75)',
      Marathon: 'rgba(88, 120, 169, 0.95)', 
      'Half Marathon': 'rgba(90, 142, 89, 0.95)',
      '10K': 'rgba(144, 63, 63, 0.75)', 
      'All Races': 'rgba(144, 63, 63, 0.75)', 
      '5K': 'rgba(88, 120, 169, 0.95)', 
      Other: 'rgba(88, 120, 169, 0.95)', 
      '10 Miler': 'rgba(138, 135, 61, 0.95)'}
    const stateObject = stateArray.reduce((stateObj, state) => {
      stateObj[state] = {fill: colors[filter]}
      return stateObj
    }, {})
    return stateObject
  }

  handleStateClick = (event) => {
    if(event.target.dataset.name === this.state.state) {
      this.setState({
        raceInfo: '',
        textStyle: { left: 0,
        top: 0,
        display: 'none'
        },
        state: ''
      })
    } else {
      this.setState({
        textStyle: { 
          left: event.clientX,
          top: event.clientY,
          display: 'inline'
        },
        state: event.target.dataset.name
      })
      this.setState({raceInfo: `You still need a race in ${event.target.dataset.name}.`})
      this.props.races.forEach(race => { 
        if (race.state === event.target.dataset.name) {
          this.setState({raceInfo: <ul><li>{race.raceName} in {race.city}, {race.state}.</li> <li>Distance: {race.distance}</li><li>Time: {race.time}</li></ul>})
        }
      })
    } 
  }

  handleDropdownChange = (event) => {
    this.setState({
      filter: event.value
    })
  }

  countStates(raceArray) {
    const stateArray = raceArray.filter(race => race.completed === 'true')
    return stateArray.length
  }

  render() {
    return (
      <div className='map'>
        <div className='map-key'>
          <p>You have run {this.props.races.length} races in {this.countStates(this.props.races)} states!</p>
          <p>Click on states to see race info.</p>
          <p>Click below filter by distance:</p>
          <Dropdown 
          options={['All Races', 'Marathon', 'Half Marathon', '10 Miler', '10K', '5K', 'Other']}
          placeholder='All Races'
          name='distance'
          value={this.state.filter}
          onChange={this.handleDropdownChange}
          />
        </div>
        <div className='state-map'>
          <div className='raceInfo'>
            <p style={this.state.textStyle} className='raceText' >{this.state.raceInfo}</p>
          </div>
          <USAMap customize={this.props.races.length > 0 ? this.fillStates(this.state.filter) : {}} onClick={this.handleStateClick}/>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  races: state.races
});

export default connect(mapStateToProps)(StateMap);