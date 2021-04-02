import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/AddCircle';
import { store } from '../src/store';

const URL = 'http://localhost:3000/users';
const InfoDisplay = () => {

    const [details, setDetails] = useState([]);
    store.subscribe(() => {
        //console.log('State after dispatch: ', store.getState());
        setDetails(store.getState());
        //console.log(details);
    });
    const createUserButton = () => {
        return (
            <>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<AddIcon />}
                    onClick={() => sendCreateRequest()}
                >
                    Add User
                </Button>
            </>
        );
    };

    const sendCreateRequest = () => {
        let state = store.getState();
        if (state.addUser.f_name &&
            state.addUser.l_name &&
            state.addUser.pwd &&
            state.addUser.b_date &&
            state.addUser.gender) {
            console.log(`%c Creating user: ${JSON.stringify(state.addUser)} `, 'background: #0F0; color: #FFF; font-size: 2em');
            const options = {
                method: 'POST',
                url: URL + '/create',
                data: {
                    first_name: state.addUser.f_name,
                    last_name: state.addUser.l_name,
                    password: state.addUser.pwd,
                    birth_date: state.addUser.b_date,
                    gender: state.addUser.gender
                },
                transformResponse: [(data) => {
                    return JSON.stringify(data);
                }]
            };
            console.log(axios(options));
        }

    };

    let showfirstname = 'none';
    let showlastname = 'none';
    let showpassword = 'none';
    let showgender = 'none';
    let showbday = 'none';
    if (details.addUser) {
        if (details.addUser.f_name) {
            showfirstname = details.addUser.f_name
            console.log(`%c State: ${details.addUser.f_name} `, 'background: #FFF; color: #000; font-size: 2em');
        }
        if (details.addUser.l_name) {
            showlastname = details.addUser.l_name
            console.log(`%c State: ${details.addUser.l_name} `, 'background: #FFF; color: #000; font-size: 2em');
        }
        if (details.addUser.pwd) {
            showpassword = details.addUser.pwd
            console.log(`%c State: ${details.addUser.pwd} `, 'background: #FFF; color: #000; font-size: 2em');
        }
        if (details.addUser.b_date) {
            showbday = details.addUser.b_date
            console.log(`%c State: ${details.addUser.b_date} `, 'background: #FFF; color: #000; font-size: 2em');
        }
        if (details.addUser.gender) {
            showgender = details.addUser.gender
            console.log(`%c State: ${details.addUser.gender} `, 'background: #FFF; color: #000; font-size: 2em');
        }
    }


    return (
        <>
            <div>
                The form contains:
                <br></br>
                First Name: {showfirstname} <br></br>
                Last Name: {showlastname} <br></br>
                Password: {showpassword} <br></br>
                Birth Date: {showbday} <br></br>
                Gender: {showgender} <br></br>
            </div>
            <div style={{ marginTop: 1 + 'em' }}>
                {createUserButton()}
            </div>
        </>
    );

};
export default InfoDisplay;