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
      raceName: this.props.searchRace ? this.props.searchRace.raceName : '',
      distance: '',
      time: '',
      city: this.props.searchRace ? this.props.searchRace.city : '',
      state: this.props.searchRace ? this.props.searchRace.state : '',
      date: this.props.searchRace ? this.props.searchRace.date : '',
      completed: 'true',
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
    this.props.clearSearchRace();
    console.log(this.props.searchRace)
    const raceId = await api.addRace(this.state, this.props.user.id)
    if (raceId.id) {  
      this.props.addRace(this.state);
      this.setState({
          raceName: '',
          distance: '',
          time: '',
          city: '',
          state: '',
          date: '',
          completed: 'true',
          error: 'Race Added!'
        });  
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

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add a race to your log:</h2>
        <p>(All fields required.)</p>
        <input type="text" 
          placeholder='Race Name'
          name='raceName'
          value={this.props.searchRace ? this.props.searchRace.raceName : this.state.raceName}
          onChange={this.handleChange}/>
        <Dropdown options={['Marathon', 'Half Marathon', '10 Miler', '10K', '5K', 'Other']}
          placeholder='Select a race distance'
          name='distance'
          value={this.state.distance}
          onChange={this.handleDropdownChange}/>
        <input type="text" 
          placeholder='Time'
          name='time'
          value={this.state.time}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='City'
          name='city'
          value={this.props.searchRace ? this.props.searchRace.city : this.state.city}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='State'
          name='state'
          value={this.props.searchRace ? this.props.searchRace.state : this.state.state}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='Date (DD-MM-YYYY)'
          name='date'
          value={this.props.searchRace ? this.props.searchRace.date : this.state.date}
          onChange={this.handleChange}/>
        <input type='radio'
          id='choiceTrue'
          name='completed'
          value='true'
          onChange={this.handleChange}
          checked={this.state.completed === 'true'}/>
        <label htmlFor='choiceTrue'>Completed</label>
        <input type='radio'
          id='choiceFalse'
          name='completed'
          value='false'
          onChange={this.handleChange}
          checked={this.state.completed === 'false'}/>
        <label htmlFor='choiceFalse'>Interested</label>
        <button type='submit'>Submit</button>
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