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
      filter: ''
    }
  }

  fillStates = (filter) => {
    const stateArray = this.props.races.map(race => {
      if(filter && race.completed === 'true') {
        if (race.distance === filter || race.completed === filter) {
          console.log('race', race)
          return race.state
        } else {
          return ''
        }
      } else if (race.completed === 'true') {
        return race.state
      }
    })
    console.log(stateArray)
    const stateObject = stateArray.reduce((stateObj, state) => {
      stateObj[state] = {fill:'magenta'}
      console.log('state', state)
      console.log('filter', filter)
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
          this.setState({raceInfo: `${race.raceName} in ${race.city}, ${race.state}. Distance: ${race.distance} Time: ${race.time}`})
        }
      })
    } 
  }

  handleDropdownChange = (event) => {
    this.setState({
      filter: event.value
    })
  }

  
  render() {
    return (
      <div className='map'>
        <div className="filter">
          <Dropdown 
          options={['', 'Marathon', 'Half Marathon', '10 Miler', '10K', '5K', 'Other']}
          placeholder='Filter by distance'
          name='distance'
          value={this.state.filter}
          onChange={this.handleDropdownChange}
          />
        </div>
        <div className='raceInfo'>
          <p style={this.state.textStyle} className='raceText' >{this.state.raceInfo}</p>
        </div>
        <USAMap customize={this.props.races.length > 0 ? this.fillStates(this.state.filter) : {}} onClick={this.handleStateClick}/>
      </div>
    );
  }

}

export const mapStateToProps = state => ({
  races: state.races
});

export default connect(mapStateToProps)(StateMap);