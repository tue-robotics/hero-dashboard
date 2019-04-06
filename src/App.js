import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        Dashboard
        <ProgressBar now={20} />
      </div>
    );
  }
}

export default App;
