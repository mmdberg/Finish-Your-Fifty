import React, { Component } from 'react';
// import { connect } from 'react-redux';
import USAMap from 'react-usa-map';
import './styles.css';

export class StateMap extends Component {
  fillStates = () => {
    return {
      'CO': {
        fill: 'magenta'
      }
    };
  }

  handleStateClick = (event) => {
    console.log(event.target.dataset.name);
  }
  
  render() {
    return (
      <div className='map'>
        <USAMap customize={this.fillStates()} onClick={this.handleStateClick}/>
      </div>
    );
  }

}