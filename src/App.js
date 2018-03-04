import React, { Component } from 'react';
import Room from './components/Room/Room';
import Group from './components/Group/Group';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
    	<div className="App">
    	<Router>
	    	<Switch>
	    		<Route exact path="/" component = {Group} />
	    		<Route exact path="/room" component={Room}/>
	    	</Switch>
	    </Router>
	    </div>
    );
  }
}

export default App;
