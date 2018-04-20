import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/';
import { fire } from '../../firebase/fire.js';
import { ToastContainer, toast } from 'react-toastify';
import * as routes from '../../route';
import './Notes.css';

// Main app

const SignInPage = ({ history }) =>
    <div>
        <Notes history={history} />
    </div>

const INITIAL_STATE = {
    email: '',
    password: '',
    iterator: 0,
    error: null,
};

// Main app
class Notes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...INITIAL_STATE
        };
        // Bindings
    }

    componentDidMount(){
        let currUser = fire.auth().currentUser;
        var email = "User!";
        if (currUser){
            email = fire.auth().currentUser.email;
        }
        console.log(email);
        toast.info("Welcome " + email, {
            position: toast.POSITION.BOTTOM_CENTER
        });

    }

    render() {
        // const for React CSS transition declaration

        return (
            <div>
                <ToastContainer/>

                <div className={"background"}/>
            </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    Notes,
};