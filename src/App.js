import React, { Component } from 'react';
import Group from './components/Group/Group';
import Room from './components/Room/Room';
import {Button,Grid,Row,Col} from 'react-bootstrap';
import './App.css';
import {fadeIn} from 'react-animations';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Room />
      </div>
    );
  }
}

export default App;
