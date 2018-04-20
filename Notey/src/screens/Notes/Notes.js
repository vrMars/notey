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
            notesData: [],
        };
        // Bindings
    }

    componentDidMount(){
        let currUser = fire.auth().currentUser;
        var email = "User!";
        if (currUser){
            email = fire.auth().currentUser.email;
            let ref = fire.database().ref('Users/' + currUser.uid);
            console.log(ref);
            ref
                .once('value', (snapshot) => {
                    var notesData = [];
                    var i = 0;
                    snapshot.forEach((child) => {
                       var title = child.key;
                       var value = child.val();
                       var img = i;
                       notesData[i] = {
                         img: img,
                         title: title,
                         author: email,
                       };
                        i += 1;
                    });
                    this.setState({
                        notesData: notesData
                    });
                 });
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

                <MuiThemeProvider>
                <div style={styles.root}>
                    <GridList style={styles.gridList} cols={0} padding={20} cellHeight={250}>
                        {this.state.notesData.map((tile) => (
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