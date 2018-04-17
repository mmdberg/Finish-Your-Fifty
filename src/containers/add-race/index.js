import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './styles.css';
import * as api from '../../apiCalls';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

export class AddRace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceName: this.props.searchRace.raceName ? this.props.searchRace.raceName : '',
      distance: '',
      time: '',
      city: this.props.searchRace.city ? this.props.searchRace.city : '',
      state: this.props.searchRace.state ? this.props.searchRace.state : '',
      date: this.props.searchRace.date ? this.props.searchRace.date : '',
      completed: 'Completed',
      error: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let raceId = await api.addRace(this.state, this.props.user.id)
    if(!raceId.error) {
      this.props.addRace(this.state);
      this.props.clearSearchRace();
      this.setState({
        raceName: '',
        distance: '',
        time: '',
        city: '',
        state: '',
        date: '',
        completed: 'Completed',
        error: 'Race Added!'
      })  
    } else {
      this.setState({
        error: `Unable to add race. ${raceId.error}`
      })
    }
  }

  handleDropdownChange = (event) => {
    this.setState({
      distance: event.value
    })
  }

  clearFields = () => {
    this.props.clearSearchRace();
    this.setState({
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: '',
      date: '',
      completed: 'Completed',
      error: ''
    })  
  }

  render() {
    return (
      <form className='add-race-form'>
        <h2>Add a race to your log:</h2>
        <p>(All fields required.)</p>
        <input type="text" 
          placeholder='Race Name'
          name='raceName'
          value={this.props.searchRace.raceName ? this.props.searchRace.raceName : this.state.raceName}
          onChange={this.handleChange}/>
        <Dropdown options={['Marathon', 'Half Marathon', '10 Miler', '10K', '5K', 'Other']}
          placeholder='Select a race distance'
          name='distance'
          value={this.state.distance}
          onChange={this.handleDropdownChange}/>
        <input type="text" 
          placeholder='Time'
          className='half-input'
          name='time'
          value={this.state.time}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='Date (DD-MM-YYYY)'
          className='half-input'
          name='date'
          value={this.props.searchRace.date ? this.props.searchRace.date : this.state.date}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='City'
          className='half-input'
          name='city'
          value={this.props.searchRace.city ? this.props.searchRace.city : this.state.city}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='State'
          className='half-input'
          name='state'
          value={this.props.searchRace.state ? this.props.searchRace.state : this.state.state}
          onChange={this.handleChange}/>
        <div className='radio-buttons'>
          <input type='radio'
            id='choiceTrue'
            name='Completed'
            value='true'
            onChange={this.handleChange}
            checked={this.state.completed === 'Completed'}/>
          <label htmlFor='choiceTrue'>Completed</label>
          <input type='radio'
            id='choiceFalse'
            name='Interested'
            value='false'
            onChange={this.handleChange}
            checked={this.state.completed === 'Interested'}/>
          <label htmlFor='choiceFalse'>Interested</label>
        </div>
        <button onClick={this.handleSubmit}>Submit</button>
        <button onClick={this.clearFields}>Clear</button>
        <p>{this.state.error}</p>
      </form>
    );
  }
}

AddRace.propTypes = {
  races: PropTypes.array,
  user: PropTypes.object,
  searchRace: PropTypes.object,
  addRace: PropTypes.func
};

export const mapStateToProps = state => ({
  races: state.races,
  user: state.user,
  searchRace: state.searchRace
});

export const mapDispatchToProps = dispatch => ({
  addRace: race => dispatch(actions.addRace(race)),
  clearSearchRace: () => dispatch(actions.clearSearchRace())
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRace);