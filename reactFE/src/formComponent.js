import React from 'react';
import moment from 'moment';
import TextField from '@material-ui/core/TextField';
//import { store } from '../src/store';
import { actionCreators } from '../src/store';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: undefined,
            f_name: undefined,
            l_name: undefined,
            pwd: undefined,
            b_date: undefined,
            gender: undefined
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
        switch (name) {
            case 'f_name':
                actionCreators.updateFirsName(value);
                break;
            case 'l_name':
                actionCreators.updateLastName(value);
                break;
            case 'pwd':
                actionCreators.updatePassword(value);
                break;
            case 'b_date':
                actionCreators.updateBday(value);
                break;
            case 'gender':
                actionCreators.updateGender(value);
                break;
            default:
                break;
        }
        // console.log(`Set state called for - ${name} : ${value}.`);
        // console.log(`this punto state :  ${this.state}`);
        // console.log(`store punto get state :  ${store.getState()}`);
    }

    render() {
        return (
            <>
                <form>
                    <div style={{ marginTop: 2 + 'em' }}>
                        <label>First Name <input name="f_name" type="text"
                            value={this.state.f_name} onChange={e => actionCreators.updateFirstName(e.target.value)} /></label>

                        <label style={{ marginLeft: 3 + 'em' }}>Last Name <input name="l_name" type="text"
                            value={this.state.l_name} onChange={e => actionCreators.updateLastName(e.target.value)} /></label>
                    </div>
                    <br />
                    <div style={{ marginTop: 2 + 'em' }}>
                        <label>Password <input name="pwd" type="text"
                            value={this.state.pwd} onChange={e => actionCreators.updatePassword(e.target.value)} /></label>
                        <label style={{ marginLeft: 3 + 'em' }}>Birth date <TextField
                            id="b_date"
                            type="date"
                            InputLabelProps={{
                                shrink: false,
                            }}
                            //value={moment(this.state.b_date).format('YYYY-MM-DD')}
                            onChange={e => actionCreators.updateBday(moment(e.target.value).format('YYYY-MM-DD'))}
                        /></label>
                    </div>
                    <div style={{ marginTop: 2 + 'em' }}>
                        <label>Gender <select name="gender"
                            defaultValue={{ label: "Select gender", value: null }}
                            value={this.state.gender}
                            onChange={e => actionCreators.updateGender(e.target.value)}>
                            <option defaultValue="0" >Select gender</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select></label>
                    </div>
                    <br />
                </form>
            </>
        );
    }
}

export default CreateUser;