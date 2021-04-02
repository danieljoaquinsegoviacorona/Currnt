import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';

import { store } from '../src/store';

const URL = 'http://localhost:3000/users';

const Table = () => {
    store.subscribe(() => {
        console.log('State after dispatch: ', store.getState());

    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getData()
    }, []);

    const getData = async () => {
        const response = await axios.get(`${URL}/list`);
        setUsers(response.data);
    };

    const editData = (id) => {
        let st = store.getState();
        const options = {
            method: 'PUT',
            url: `${URL}/update/${id}`,
            data: {
                first_name: st.addUser.f_name,
                last_name: st.addUser.l_name,
                password: st.addUser.pwd,
                birth_date: st.addUser.b_date,
                gender: st.addUser.gender
            },
            transformResponse: [(data) => {
                return data;
            }]
        };
        console.log(axios(options));
    };

    const removeData = (id) => {

        axios.delete(`${URL}/delete/${id}`).then(res => {
            const del = users.filter(employee => id !== employee.id)
            setUsers(del);
        });
    };



    const renderHeader = () => {
        let headerElement = ['id', 'first name', 'last name', 'birth date', 'gender', 'delete', 'edit']

        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        });
    };

    const renderBody = () => {
        return users && users.map(({ user_id, first_name, last_name, birth_date, gender }) => {
            return (
                <tr key={user_id}>
                    <td>{user_id}</td>
                    <td>{first_name}</td>
                    <td>{last_name}</td>
                    <td>{birth_date}</td>
                    <td>{(gender === 1) ? 'Male' : 'Female'}</td>
                    <td className='opration'>
                        <IconButton variant="outlined" color="secondary" onClick={() => removeData(user_id)}><DeleteIcon /></IconButton>
                    </td>
                    <td>
                        <IconButton color="primary" onClick={() => editData(user_id)}><UpdateIcon /></IconButton>
                    </td>
                </tr>
            );
        });
    }

    return (
        <>
            <h1 id='title'>User Table</h1>
            <table id='user' style={{ marginLeft: 5 + 'em', marginTop: 5 + 'em' }}>
                <thead>
                    <tr>{renderHeader()}</tr>
                </thead>
                <tbody>
                    {renderBody()}
                </tbody>
            </table>
        </>
    );

}

export default Table;