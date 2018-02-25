import React, { Component } from 'react';
import firebase from './fire.js';

import logo from './logo.svg';
import Editor from './screens/Editor/Editor.js'
import Login from './screens/Login/Login.js'

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    return(
      <Login />
    )
	}
}

export default App;
