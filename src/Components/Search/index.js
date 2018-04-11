import React, { Component } from 'react';
import * as api from '../../apiCalls';
import './styles.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';


            // <table>
            //   <tr>
            //     <th>Event</th>
            //     <th>City</th>
            //     <th>Date</th>
            //     <th>State</th>
            //   </tr>
            //   {this.state.results}
            // </table>

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: '',
      year: '',
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
    const results = await api.fetchRaces(this.state.year);
    const racesByState = results.filter(race => 
      race.state === this.state.state
    )
    if (!racesByState.length) {
      this.setState({
        error: 'No races match your search criteria. Try again.'
      });
    } else {
      this.setState({
        results: racesByState
      });
    }
  }

  clearSearch = () => {
    this.setState({
      state: '',
      year: '',
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
          <input type='text'
          name='year'
          placeholder='Year'
          value={this.state.year}
          onChange={this.handleChange}
          maxLength='4'/>
          <button onClick={this.handleSubmit}>Search</button>
          <button onClick={this.clearSearch}>Clear</button>
        </form>
        {
          this.state.results.length ?
            <ReactTable
              data={this.state.results}
              columns={[
                {
                  Header: 'Event',
                  accessor: 'event'
                },
                {
                  Header: 'City',
                  accessor: 'city'
                },
                {
                  Header: 'Date',
                  accessor: 'date'
                },
                {
                  Header: 'State',
                  accessor: 'state'
                }
              ]} />
            : this.state.error
        }

      </div>
    );
  }

}

export default Search;