import React, { Component } from 'react';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Indicator from './Indicator';
import Battery from './Battery';

import './App.css';
import AutoRos from './ros';

class App extends Component {
  constructor() {
    super()
    const remote = window.require("electron").remote;
    const argv = remote.process.argv;
    const index = argv.length - 1;
    var url;
    if (index > 0) {
      const host = argv[index];
      url = `ws://${host}:9090`;
    }
    AutoRos.connect(url);
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <div className="box">
              <Col>
                <Indicator ros={AutoRos.ros} />
              </Col>
            </div>
            <Battery topic='battery' ros={AutoRos.ros} />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
