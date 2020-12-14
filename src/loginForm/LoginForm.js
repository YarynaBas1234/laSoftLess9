import React from 'react';
import './LoginForm.css';
import {Box, Button} from '@material-ui/core';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: true
        }
    }
    static getDerivedStateFromProps(props, state) {
        return {
            userCurrent: props.userCurrent,
            text: props.text,
            textError: props.textError
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={(e) => this.props.public(e)} id="main-form">
                    <h1>{this.state.text}</h1>
                    <Box m={1}>
                        {/* <TextField name="name" className="inp" id="standard-basic" label="Nickname" /> */}
                        <input type="text" className="inp" name="name" placeholder="Nickname" /><span> *</span>
                    </Box>
                    <Box m={1}>
                        <input type="email" className="inp" name="login" placeholder="Login" /><span> *</span>
                    </Box>
                    <Box m={1}>
                        <input type="password" className="inp" name="password" placeholder="Password" /><span> *</span>
                    </Box>
                    <textarea className="inp" cols="24" name="textarea" placeholder="Info about you" />
                    <Button type="submit" className="inp-box" variant="contained" color="primary">Save</Button>
                    <h3>{this.state.textError}</h3>
                </form>
            </div>
        );
    }
}
export default LoginForm;