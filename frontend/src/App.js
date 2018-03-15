import React, { Component } from 'react'
import './App.css'
import LoginScreen from './LoginPage/LoginScreen'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from './theme'
import PageAccueilPerso from './MyHomepageLinkapp/PageAccueilPerso'
import * as queryString from 'query-string'

class App extends Component {
    constructor(props){
        super(props);
        this.state={
          displayedScreen: 'Login Page',
          token: '',
        }

        this.appOnSuccessLogin = this.appOnSuccessLogin.bind(this);
    }

    componentWillMount(){
    }

    appOnSuccessLogin = (token) => {
      const parsedQuery = queryString.parse(document.location.search);

      if (parsedQuery.redirect) {
        parsedQuery.token = token;
        let queryToken = queryString.stringify({token: token});
        document.location.replace(parsedQuery.redirect + '?' + queryToken);
      }

      else {
        this.setState({token: token, displayedScreen: 'Page Accueil Perso'});
      }
    }

    render() {
        return (
          <MuiThemeProvider theme={theme}>
            <div className="App">
              {this.state.displayedScreen === 'Login Page' && (
                  <div className='loginPage'>
              <LoginScreen parentContext={this}
                           appOnSuccessLogin={this.appOnSuccessLogin}/>
                </div>)
              }
              {this.state.displayedScreen === 'Page Accueil Perso' && (
                <PageAccueilPerso parentContext={this}
                                  token={this.state.token}/>
              )}
            </div>
          </MuiThemeProvider>
        );
    }
}

export default App;