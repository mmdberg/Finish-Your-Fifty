import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './styles.css';
import * as api from '../../apiCalls';
import PropTypes from 'prop-types';

export class AddRace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      raceName: '',
      distance: '',
      time: '',
      city: '',
      state: '',
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
    const raceId = await api.addRace(this.state, this.props.user.id)
    if (raceId.id) {  
      this.props.addRace(this.state);
      this.setState({
          raceName: '',
          distance: '',
          time: '',
          city: '',
          state: '',
          completed: 'true',
          error: 'Race Added!'
        });    
    } else {
      this.setState({
        error: `Unable to add race. ${raceId.error}`
      })
    }
    
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add a race to your log:</h2>
        <input type="text" 
          placeholder='Race Name'
          name='raceName'
          value={this.state.raceName}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='Distance'
          name='distance'
          value={this.state.distance}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='Time'
          name='time'
          value={this.state.time}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='City'
          name='city'
          value={this.state.city}
          onChange={this.handleChange}/>
        <input type="text" 
          placeholder='State'
          name='state'
          value={this.state.state}
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
  addRace: PropTypes.func
};

export const mapStateToProps = state => ({
  races: state.races,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  addRace: race => dispatch(actions.addRace(race))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRace);