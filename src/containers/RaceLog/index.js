import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import PropTypes from 'prop-types';
import './styles.css';
import * as api from '../../apiCalls';

export class RaceLog extends Component {
  makeRaceList = (raceArray) => {
    const raceList = raceArray.map(race => {
      return {
        ...race, 
        remove: <button onClick={() => this.handleRemove(race)}> X </button>
      };
    });
    return raceList;
  }

  handleRemove = (race) => {
    api.deleteRace(race.id);
    this.props.removeRace(race);
  }

  render() {
    return (
      <div className='race-log'>
        {
          (this.props.races.length > 0) ?
            <ReactTable 
              data={this.makeRaceList(this.props.races)}
              columns={[
                {
                  Header: 'RACE',
                  accessor: 'raceName'
                },
                {
                  Header: 'DISTANCE',
                  accessor: 'distance'
                },
                {
                  Header: 'TIME',
                  accessor: 'time',
                  width: 70
                },
                {
                  Header: 'CITY',
                  accessor: 'city',
                  width: 90
                },
                {
                  Header: 'STATE',
                  accessor: 'state',
                  width: 50
                },
                {
                  Header: 'DATE',
                  accessor: 'date',
                  width: 85
                },
                {
                  Header: 'COMPLETED?',
                  accessor: 'completed',
                  width: 90
                },
                {
                  Header: 'Remove',
                  accessor: 'remove',
                  width: 55
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