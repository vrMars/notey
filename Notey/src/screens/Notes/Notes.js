import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../firebase/';
import { fire } from '../../firebase/fire.js';
import { ToastContainer, toast } from 'react-toastify';
import * as routes from '../../route';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import img from './img.jpg';
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

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
    },
    titleStyle: {
        color: 'rgb(255, 255, 255)',
    },
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

        const tilesData = [
            {
                img: 'img.jpg',
                title: 'Breakfast',
                author: 'jill111',
            },
            {
                img: 'img.jpg',
                title: 'Tasty burger',
                author: 'pashminu',
            },
            {
                img: 'img.jpg',
                title: 'Camera',
                author: 'Danson67',
            },
            {
                img: 'img.jpg',
                title: 'Morning',
                author: 'fancycrave1',
            },
            {
                img: 'img.jpg',
                title: 'Hats',
                author: 'Hans',
            },
            {
                img: 'img.jpg',
                title: 'Honey',
                author: 'fancycravel',
            },
            {
                img: 'img.jpg',
                title: 'Vegetables',
                author: 'jill111',
            },
            {
                img: 'img.jpg',
                title: 'Water plant',
                author: 'BkrmadtyaKarki',
            },
        ];

        return (
            <div>
                <ToastContainer/>

                <MuiThemeProvider>
                <div style={styles.root}>
                    <GridList style={styles.gridList} cols={0} padding={20} cellHeight={250}>
                        {tilesData.map((tile) => (
                            <GridTile
                                key={tile.img}
                                title={tile.title}
                                actionIcon={<IconButton><StarBorder color="rgb(255, 255, 255)" /></IconButton>}
                                titleStyle={styles.titleStyle}
                                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                            >
                                <img src={img} />
                            </GridTile>
                        ))}
                    </GridList>
                </div>

                </MuiThemeProvider>


                </div>
        );
    }
}

export default withRouter(SignInPage);

export {
    Notes,
};