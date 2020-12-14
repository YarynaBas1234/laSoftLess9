import React from 'react';
import {Paper, Container} from '@material-ui/core'

class LoginForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    static getDerivedStateFromProps(props, state){
        return{
            userCurrent: props.userCurrent,
            isEnter: props.isEnter,
            users: props.users
        }
    }

    render(){
        return(
            <div>
                <h1>User`s data</h1>
                <Paper>
                    {this.state.isEnter && 
                    <Container>
                        <p>Name: {this.state.userCurrent.name}</p>
                        <p>Login: {this.state.userCurrent.login}</p>
                        {this.state.users.map((item, i) =>{
                            if(item.name === this.state.userCurrent.name){
                                return <p key={i}>Info about: {item.textarea}</p>
                            }
                        })}
                        
                    </Container>}
                </Paper>
            </div>
        );
    }
}
export default LoginForm;