import React, { Component } from 'react';
import * as ReactMde from 'react-mde';
import { Markdown } from 'react-showdown';
import 'simplemde/dist/simplemde.min.css';
import { fire } from '../../firebase/fire.js';
import TimerMixin from 'react-timer-mixin';

import 'react-mde/lib/styles/css/react-mde-preview.css';
import 'react-mde/lib/styles/css/react-mde-textarea.css';
import 'react-mde/lib/styles/css/react-mde-toolbar.css';
import '../../../node_modules/font-awesome/css/font-awesome.css';

import './Editor.css';

var Showdown = require('showdown');
var SimpleMDE = require('react-simplemde-editor');

class Editor extends Component {
	mixins: [ReactFireMixin, TimerMixin];

	constructor(props) {
		super(props);
		this.state = { code: '', oldCode: '', selection: null };
	}

	componentWillMount() {}

	componentDidMount() {
		let firebaseRef = fire.database().ref('testNote');
		console.log(firebaseRef);
		firebaseRef
			.once('value', (snapshot) => {
				/* Update React state when message is added at Firebase Database */
				let message = snapshot.val().code;
				this.setState({ code: message.concat(this.state.code) });
			})
			.then(() => {
				this.setState({ oldCode: 'a' });
			});
	}

	handleChange(value) {
		fire
			.database()
			.ref('testNote')
			.set({
				code: value
			});
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
		console.log(this.state.code);
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Notey</h1>
				</header>
				<SimpleMDE
					className="test"
					onChange={this.handleChange.bind(this)}
					value={this.state.code}
					options={{
						placeholder: 'Type text here',
						showIcons: ['code', 'table', 'horizontal-rule'],
						renderingConfig: {
							codeSyntaxHighlighting: true
						},
						promptURLs: true,
						shortcuts: {
							drawTable: 'Cmd-Alt-T'
						}
					}}
				/>
			</div>
		);
	}
}

export default Editor;
