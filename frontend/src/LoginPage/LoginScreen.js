import React, { Component } from 'react'
import Login from './Login'
import cookie from 'react-cookies'
import { funcCheckAndRefreshToken } from '../Utils/ApiCall'

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginScreen: [],
      isLogin: true
    };

  }

  componentWillMount() {
    //si token présent d'une ancienne session connection auto
    if (cookie.load('token')) {
      funcCheckAndRefreshToken().then(token => this.props.appOnSuccessLogin(token))
        .catch(error => console.log('error'));
    }

    var loginScreen = [];
    loginScreen.push(<Login parentContext={this}
                            appOnSuccessLogin={this.props.appOnSuccessLogin}/>);
    this.setState({
      loginScreen: loginScreen,
    });

  }

  render() {
    return (
      <div className="loginScreen">
        {this.state.loginScreen}
      </div>
    );
  }

  handleClick(event) {
    var loginScreen = [];
    loginScreen.push(<Login parentContext={this}/>);
    this.setState({
      loginScreen: loginScreen,
      isLogin: true
    });
  }
}

export default LoginScreen;
