import React, { Component } from 'react';
import logo from './logo.svg';
import { Grid } from '../../components/Grid';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Grid />
        </header>
      </div>
    );
  }
}

export default App;
