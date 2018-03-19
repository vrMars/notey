import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/';
import { ToastContainer, toast } from 'react-toastify';
import * as routes from '../../route';
import './Signup.css';
import {fire} from "../../firebase/fire";

// Main app

const SignupPage = ({ history }) =>
    <div>
        <Signup history={history} />
    </div>

const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
    uid: '',
    classes: 'NONE SET',
    iterator: 0,
    error: null,
};

// Main app
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        };
        // Bindings
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addUserToDB(uid) {
        fire
            .database()
            .ref('Users')
            .child(uid)
            .set({
                classes: this.state.classes,
                email: this.state.email,
                name: this.state.name,
                note1: ""
            });
        this.props.history.push(routes.EDITOR);
    }

    handleSubmit(event) {
        const {
            email,
            password,
        } = this.state;

        auth.doCreateUserWithEmailAndPassword(email, password)
            .then(() => {
                auth.doSignInWithEmailAndPassword(email, password)
                    .then(() => {
                        this.addUserToDB(fire.auth().currentUser.uid)
                        this.setState(() => ({ ...INITIAL_STATE }));
                    })
                    .catch(error => {
                        this.setState(() => ({...INITIAL_STATE}));
                        console.log(error.message);
                        toast.error(error.message, {
                            position: toast.POSITION.BOTTOM_CENTER
                        });
                    });
            })
            .catch(error => {
                this.setState(() => ({...INITIAL_STATE}));
                console.log(error.message);
                toast.error(error.message, {
                    position: toast.POSITION.BOTTOM_CENTER
                });
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


        return (
            <div>
                <ToastContainer/>
                <video
                    ref="mybgvideo"
                    autoPlay
                    muted
                    src={'https://pixabay.com/en/videos/download/video-1655_source.mp4'}
                    onEnded={() => this.onEnd(this)}>
                    Your browser does not support the video tag.
                </video>
                <div className="darken" />


                <div className="Modal">
                    <Logo />

                    <form autoComplete={"off"} method={"post"} onSubmit={this.handleSubmit}>

                        <div className="Input">
                            <input
                                ref={"name"}
                                type={"text"}
                                name="name"
                                placeholder="name"
                                value={this.state.name}
                                autoComplete={"new-password"}
                                onChange={(e)=>{this.setState({name: e.target.value});
                                }}
                                required
                            />
                            <label for={"name"} />
                        </div>

                        <div className="Input">
                            <input
                                ref={"email"}
                                type={"text"}
                                name="email"
                                placeholder="email"
                                value={this.state.email}
                                autoComplete={"new-password"}
                                onChange={(e)=>{this.setState({email: e.target.value});
                                }}
                                required
                            />
                            <label for={"email"} />
                        </div>
                        <div className="Input">
                            <input
                                ref={"password"}
                                type="password"
                                name="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={(e)=>{this.setState({password: e.target.value});
                                }}
                                required
                                autoComplete={"new-password"}
                            />
                            <label for={"password"} />
                        </div>
                        <button className="register_button"> Register </button>
                    </form>
                </div>

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

export default withRouter(SignupPage);

export {
    Signup,
};