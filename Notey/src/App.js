import React, { Component } from 'react';
import * as ReactMde from 'react-mde';
import { Markdown } from 'react-showdown';
import 'simplemde/dist/simplemde.min.css';


import 'react-mde/lib/styles/css/react-mde-preview.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import '../node_modules/font-awesome/css/font-awesome.css';

import logo from './logo.svg';
import './App.css';

var Showdown = require('showdown');
var SimpleMDE = require('react-simplemde-editor');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { code: '', oldCode: '', selection: null };
	}

	handleChange(value) {
		this.setState({
			code: value
		});
	}
	// //ReactMdeCommands.getDefaultCommands()
	// <div
	//   ref="editArea"
	//   contentEditable={true}
	//   className="editArea"
	//   dangerouslySetInnerHTML={{ __html: this.state.code }}
	//   onKeyPress={this.updateCode.bind(this)}
	// />
	render() {
		console.log('current code: ' + this.state.code);
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Notey</h1>
				</header>
				<SimpleMDE
					className="test"
					initialValue={"Type here!"}
					onChange={this.handleChange.bind(this)}
				/>
			</div>
		);
	}
}

export default App;
