import React, { Component } from 'react';
import firebase from './fire.js';

import logo from './logo.svg';
import Editor from './screens/Editor/Editor.js'
class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
    return(
      <Editor />
    )
	}
}

export default App;
