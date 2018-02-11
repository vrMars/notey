import React, { Component } from 'react';
import Editor, { ReactMdeCommands } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-preview.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import '../node_modules/font-awesome/css/font-awesome.css';

import logo from './logo.svg';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = { code: '# Today', selection: null };
	}

	updateCode(newCode) {
		this.setState({ code: newCode });
	}

	render() {
		console.log(this.state.code);
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Notey</h1>
				</header>
				<div className="Editor">
					<Editor
						value={this.state.code}
						onChange={this.updateCode.bind(this)}
						commands={ReactMdeCommands.getDefaultCommands()}
					/>
				</div>
			</div>
		);
	}
}

export default App;
