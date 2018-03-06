import React, { Component } from 'react'
import Login from './Login'

class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            loginScreen:[],
            isLogin: true
        }
    }

    componentWillMount(){
        var loginScreen=[];
        loginScreen.push(<Login parentContext={this} appContext={this.props.parentContext}/>);
        this.setState({
            loginScreen:loginScreen,
        })
    }

    render() {
        return (
            <div className="loginScreen">
                {this.state.loginScreen}
            </div>
        );
    }

    handleClick(event){
        var loginScreen = [];
            loginScreen.push(<Login parentContext={this}/>);
            this.setState({
                loginScreen:loginScreen,
                isLogin:true
            })
        }
}

export default LoginScreen;