import React, { Component } from 'react';
import './styles.css';
import * as api from '../../apiCalls';

class App extends Component {
  async componentDidMount () {
    const races = await api.fetchRaces()
    console.log(races)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Finish Your Fifty</h1>
        </header>
      </div>
    );
  }
}

export default App;