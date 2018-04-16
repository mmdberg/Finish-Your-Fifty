import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
// import * as api from '../../apiCalls';
import PropTypes from 'prop-types';

export class RaceLog extends Component {
  makeRaceList = (raceArray) => {
    const raceList = raceArray.map(race => {
      return {
        ...race, 
        remove: <p onClick={() => this.props.removeRace(race)}> X </p>
      };
    });
    return raceList;
  }

  render() {
    return (
      <div>
        {
          (this.props.races.length > 0) ?
            <ReactTable 
              data={this.makeRaceList(this.props.races)}
              columns={[
                {
                  Header: 'Race',
                  accessor: 'raceName'
                },
                {
                  Header: 'Distance',
                  accessor: 'distance'
                },
                {
                  Header: 'Time',
                  accessor: 'time'
                },
                {
                  Header: 'City',
                  accessor: 'city'
                },
                {
                  Header: 'State',
                  accessor: 'state'
                },
                {
                  Header: 'Date',
                  accessor: 'date'
                },
                {
                  Header: 'Completed?',
                  accessor: 'completed'
                },
                {
                  Header: 'Remove',
                  accessor: 'remove'
                }
      
              ]}
              pageSize={this.props.races.length}
            /> :
            (<p>
              You have no races saved. Go to the Add Race page to add races.
            </p>)
        }
      </div>
    );
  }
}

RaceLog.propTypes = {
  races: PropTypes.array,
  user: PropTypes.object,
  removeRace: PropTypes.func
};


export const mapStateToProps = state => ({
  races: state.races,
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  removeRace: race => dispatch(actions.removeRace(race))
});


export default connect(mapStateToProps, mapDispatchToProps)(RaceLog);