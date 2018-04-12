import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';

export const RaceLog = ({races, removeRace}) => {
  const raceList = races.map(race => {
    return {...race, remove: <p onClick={()=>removeRace(race)}> X </p>}
  })
  return (
    <div>
      <ReactTable 
        data={raceList}
        columns={[
          {
            Header: 'Event',
            accessor: 'event'
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
            Header: 'Remove Race',
            accessor: 'remove',
          }

        ]}
      />
    </div>
  )
}


export const mapStateToProps = state => ({
  races: state.races
})

export const mapDispatchToProps = dispatch => ({
  removeRace: race => dispatch(actions.removeRace(race))
})


export default connect(mapStateToProps, mapDispatchToProps)(RaceLog)