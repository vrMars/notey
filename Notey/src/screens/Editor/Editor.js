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
import {withRouter} from "react-router-dom";

var Showdown = require('showdown');
var SimpleMDE = require('react-simplemde-editor');


const SignInPage = ({ history }) =>
    <div>
        <Editor history={history} />
    </div>


class Editor extends Component {
	// noinspection JSAnnotator
    mixins: [ReactFireMixin, TimerMixin];

	constructor(props) {
		super(props);
		this.state = { code: '', oldCode: '', selection: null };
	}

	componentWillMount() {}

	componentDidMount() {
	    console.log("THIS IS LOCATION PROP!");
        console.log(this.props.location.state.noteToLoad);
		let firebaseRef = fire.database().ref('Users/' + fire.auth().currentUser.uid);
		console.log(firebaseRef);
		firebaseRef
			.once('value', (snapshot) => {
				/* Update React state when message is added at Firebase Database */
                var message = "";

                snapshot.forEach((child) => {
				    if (child.key.equals(this.props.location.state.noteToLoad)){
				        message = child.val();
                    }
                });
				this.setState({ code: message.concat(this.state.code) });
			})
			.then(() => {
				this.setState({ oldCode: 'a' });
			});
	}

	handleChange(value) {
	    let currUser = fire.auth().currentUser;
	    if (currUser){
            fire
                .database()
                .ref('Users/' + currUser.uid + this.props.location.state.noteToLoad)
                .set({
                    value
                });
            this.setState({
                code: value
            });
        }
        else {
	        console.error("Current user not logged in!");
	    }

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
export default withRouter(SignInPage);

export {
    Editor,
};