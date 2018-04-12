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
      {
        (raceList.length > 0) ?
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
            Header: 'Remove',
            accessor: 'remove',
          }

        ]}
        pageSize={raceList.length}
      /> :
      (<p>You have no races saved. Go to the Add Race page to add races.</p>)
    }
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