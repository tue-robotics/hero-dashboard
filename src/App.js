import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Indicator from './Indicator';
import Battery from './Battery';

import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Container fluid="true">
          <Row>
            <Col md="auto">
              <Indicator />
            </Col>
            <Col xs="3">
              HERO
              <Battery topic='/hero/battery_state' />
            </Col>
            <Col xs="3">
              LAPTOP
              <Battery topic='/hero/laptop_battery_state' />
            </Col>
          </Row>        
        </Container>
      </div>
    );
  }
}

export default App;
