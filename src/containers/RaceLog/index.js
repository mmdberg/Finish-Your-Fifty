import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as api from '../../apiCalls'

export class RaceLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      raceList: []
    }
  }

  async componentDidMount() {
    const raceList = await api.getUserRaces(24)
    console.log(raceList);
    this.setState({
      raceList
    })
    // this.makeRaceList()
  }

  makeRaceList = () => {
    const raceList = this.props.races.map(race => {
      return {...race, remove: <p onClick={()=>this.props.removeRace(race)}> X </p>}
    })

  }

  render() {
    return (
      <div>
        {
          (this.state.raceList.length > 0) ?
        <ReactTable 
          data={this.state.raceList}
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
          pageSize={this.state.raceList.length}
        /> :
        (<p>You have no races saved. Go to the Add Race page to add races.</p>)
      }
      </div>
    )
  }
}


export const mapStateToProps = state => ({
  races: state.races
})

export const mapDispatchToProps = dispatch => ({
  removeRace: race => dispatch(actions.removeRace(race))
})


export default connect(mapStateToProps, mapDispatchToProps)(RaceLog)