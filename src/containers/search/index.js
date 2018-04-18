import React, { Component } from 'react';
import * as api from '../../apiCalls';
import './styles.css';
import ReactTable from 'react-table';
import { Redirect } from 'react-router-dom';
import 'react-table/react-table.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import PropTypes from 'prop-types';

export class Search extends Component {
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
    );
    if (!racesByState.length) {
      this.setState({
        state: '',
        year: '',
        results: [],
        error: 'No races match your search criteria. Try again.'
      });
    } else {
      this.makeRaceList(racesByState);
    }
  }

  addInterestedRace = (race) => {
    this.props.addSearchRace(race);
  }

  makeRaceList = (RaceArray) => {
    const racesWithButton = RaceArray.map(race => {
      return {
        ...race, 
        addRace: <button onClick={() => this.addInterestedRace(race)}>+</button>
      };
    });
    this.setState({
      results: racesWithButton
    });
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
    return this.props.searchRace.raceName ? 
      <Redirect to='/add-race' /> :
      (
        <div className='search'>
          <h2>Search for races by state</h2>
          <form>
            <input type='text'
              name='state'
              placeholder='State (ex. CA)'
              value={this.state.state}
              onChange={this.handleChange}
              maxLength='2'
              autoFocus
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
                    Header: 'Race Name',
                    accessor: 'raceName'
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
                  },
                  {
                    Header: 'Add Race To Log',
                    accessor: 'addRace'
                  }
                ]}
                pageSize={this.state.results.length}
              />
              : this.state.error
          }
        </div>
      );
  }
}

Search.propTypes = {
  searchRace: PropTypes.object,
  addSearchRace: PropTypes.func
};

export const mapStateToProps = state => ({
  searchRace: state.searchRace
});

export const mapDispatchToProps = dispatch => ({
  addSearchRace: race => dispatch(actions.addSearchRace(race))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);