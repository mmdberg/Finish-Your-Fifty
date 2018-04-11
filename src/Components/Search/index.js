import React, { Component } from 'react';
import * as api from '../../apiCalls';
import './styles.css';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      results: [],
      error: ''
    };
  }

  handleChange = (event) => {
    const {name, value} = event.target;
    this.setState({
      [name]: value.toUpperCase()
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const results = await api.fetchRaces();
    console.log(results);
    if (!results.length) {
      this.setState({
        error: 'No races match your search criteria. Try again.'
      });
    } else {
      this.displayResults(results);
    }
  }

  displayResults = (raceArray) => {
    const raceList = raceArray.map((race, index) => 
      <tr key={index}>
        <td>{race.event}</td>
        <td>{race.city}</td>
        <td>{race.date}</td>
        <td>{race.state}</td>
      </tr>
    );
    this.setState({
      results: raceList
    }); 
  }

  clearSearch = () => {
    this.setState({
      state: '',
      results: [],
      error: ''
    }); 
  }

  render() {
    return (
      <div>
        <h2>Search for races by state</h2>
        <form>
          <input type='text'
            name='state'
            placeholder='State (ex. CA)'
            value={this.state.state}
            onChange={this.handleChange}
            maxLength='2'
          />
          <button onClick={this.handleSubmit}>Search</button>
          <button onClick={this.clearSearch}>Clear</button>
        </form>
        {
          this.state.results.length ?
            <table>
              <tr>
                <th>Event</th>
                <th>City</th>
                <th>Date</th>
                <th>State</th>
              </tr>
              {this.state.results}
            </table>
            : this.state.error
        }

      </div>
    );
  }

}

export default Search;