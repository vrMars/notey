import React, { Component } from 'react';

import './Login.css';

// Main app
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isVisible: true,
			iterator: 0
		};
		// Bindings
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRemount = this.handleRemount.bind(this);
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState(
			{
				isVisible: false
			},
			function() {
				console.log(this.state.isVisible);
			}
		);
		return false;
	}
	handleRemount(e) {
		this.setState(
			{
				isVisible: true
			},
			function() {
				console.log(this.state.isVisible);
			}
		);
		e.preventDefault();
	}
	onEnd(e) {
		var mVid = this.refs.mybgvideo;
		var mSrc = this.refs.mybgvideo.src;

		let videos = [
			'https://pixabay.com/en/videos/download/video-8256_large.mp4',
			'https://pixabay.com/en/videos/download/video-1655_source.mp4'
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
		let component = this.state.isVisible ? (
			<Modal onSubmit={this.handleSubmit} key="modal" />
		) : (
			<ModalBack onClick={this.handleRemount} key="bringitback" />
		);

		return (
			<div>
				<video
					ref="mybgvideo"
					id="background-video"
					autoPlay
					muted
					src={'https://pixabay.com/en/videos/download/video-1655_source.mp4'}
					onEnded={() => this.onEnd(this)}>
					Your browser does not support the video tag.
				</video>
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
					<button className="form_button"> Sign in </button>
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

// Button to brind the modal back
class ModalBack extends React.Component {
	render() {
		return (
			<button
				className="bringitback"
				onClick={this.props.onClick}
				key={this.props.className}>
				Brind the modal back !
			</button>
		);
	}
}
