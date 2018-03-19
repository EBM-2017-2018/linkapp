import axios from 'axios/index'
import React, { Component } from 'react'
import GlobalVarHandler from '../UsefulFuncVar/UsefulFuncVar'
import Login from './Login'
import cookie from 'react-cookies'

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
      axios.get(GlobalVarHandler.apiBaseUrl + 'checkandrefreshtoken', {
        headers: { 'Authorization': cookie.load('token') }
      })
        .then((response) => {
          if (response.status === 200 && response.data.newToken) {
            cookie.save('token', response.data.newToken);
            return this.props.appOnSuccessLogin(cookie.load('token'));

          }
        });
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
