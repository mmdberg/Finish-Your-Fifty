import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class AddRace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: '',
      distance: '',
      time: '',
      city: '',
      state: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addRace(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Add a race to your log:</h2>
        <input type="text" 
          placeholder='Event Name'
          name='event'
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
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export const mapStateToProps = state => ({
  races: state.races
});

export const mapDispatchToProps = dispatch => ({
  addRace: race => dispatch(actions.addRace(race))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddRace);