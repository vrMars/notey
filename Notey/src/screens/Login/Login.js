import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/';
import * as routes from '../../route';
import './Login.css';

// Main app

const SignInPage = ({ history }) =>
    <div>
        <h1>SignIn</h1>
        <Login history={history} />
    </div>

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    iterator: 0,
    error: null,
};


// Main app
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            ...INITIAL_STATE
		};
		// Bindings
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
        const {
            email,
            password,
        } = this.state;

        const {
            history,
        } = this.props;

        auth.doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState(() => ({ ...INITIAL_STATE }));
                history.push(routes.EDITOR);
            })
            .catch(error => {
                console.log(error.message);
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
	}
	onEnd(e) {
		var mVid = this.refs.mybgvideo;
		var mSrc = this.refs.mybgvideo.src;

		let videos = [
			'https://pixabay.com/en/videos/download/video-8256_large.mp4',
			'https://pixabay.com/en/videos/download/video-1655_source.mp4',
			'https://pixabay.com/en/videos/download/video-2303_source.mp4'
		];

		this.refs.mybgvideo.src = videos[this.state.iterator];
		this.setState({ iterator: this.state.iterator + 1 });
		if (this.state.iterator + 1 >= videos.length) {
			this.setState({ iterator: 0 });
		}
		mVid.load();
	}
	render() {
		// const for React CSS transition declaration
		let component = <Modal onSubmit={this.handleSubmit} key="modal" />


		return (
			<div>
				<video
					ref="mybgvideo"
					autoPlay
					muted
					src={'https://pixabay.com/en/videos/download/video-1655_source.mp4'}
					onEnded={() => this.onEnd(this)}>
					Your browser does not support the video tag.
				</video>
				<div className="darken" />

				{component}
			</div>
		);
	}
}

// Modal
class Modal extends React.Component {
	render() {
		return (
			<div className="Modal">
				<Logo />
				<form onSubmit={this.props.onSubmit}>
					<Input type="text" name="username" placeholder="username" />
					<Input type="password" name="password" placeholder="password" />
						<button className="form_button"> Sign in </button>{' '}
				</form>
				<a href="#">Lost your password ?</a>
			</div>
		);
	}
}

// Generic input field
class Input extends React.Component {
	render() {
		return (
			<div className="Input">
				<input
					type={this.props.type}
					name={this.props.name}
					placeholder={this.props.placeholder}
					required
					autocomplete="false"
				/>
				<label for={this.props.name} />
			</div>
		);
	}
}

// Fake logo
class Logo extends React.Component {
	render() {
		return (
			<div className="logo">
				<i className="fa fa-edit" aria-hidden="true" />
				<span>Notey</span>
			</div>
		);
	}
}