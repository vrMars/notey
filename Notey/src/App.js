import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation.js';
import Editor from './screens/Editor/Editor.js';
import Login from './screens/Login/Login.js';
import Signup from './screens/SignUp/Signup.js';

import * as routes from './route.js';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<div>
					<Route exact path={routes.SIGN_IN} component={() => <Login />} />
					<Route exact path={routes.EDITOR} component={() => <Editor />} />
                    <Route exact path={routes.SIGN_UP} component={() => <Signup />} />
				</div>
			</Router>
		);
	}
}

export default App;
