import React, { Component } from 'react'
import './App.css'
import LoginScreen from './LoginPage/LoginScreen'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from './theme'
import PageAccueilPerso from './MyHomepageLinkapp/PageAccueilPerso'
import * as qs from 'qs'

class App extends Component {
    constructor(props){
        super(props);
        this.state={
          displayedScreen: 'Login Page',
          token: '',
        }

        this.appOnDeconnexion = this.appOnDeconnexion.bind(this);
        this.appOnSuccessLogin = this.appOnSuccessLogin.bind(this);
    }

    componentWillMount(){
    }

    appOnSuccessLogin = (token, username) => {
      const parsedQuery = qs.parse(document.location.search.slice(1));

      if (parsedQuery.redirect) {
        const redirectUrl = new URL(parsedQuery.redirect);
        const baseUrl = redirectUrl.origin;
        const pathname = redirectUrl.pathname;
        const existingQuery = qs.parse(redirectUrl.search.slice(1));
        const newQueryString = qs.stringify({ token, username, ...existingQuery });

        document.location.replace(baseUrl + pathname + '?' + newQueryString);
      }

      else {
        this.setState({token: token, displayedScreen: 'Page Accueil Perso'});
      }
    }

    appOnDeconnexion = () => {
      this.setState({displayedScreen: 'Login Page'});
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
                                  token={this.state.token}
                                  deconnexionHandler={this.appOnDeconnexion}/>
              )}
            </div>
          </MuiThemeProvider>
        );
    }
}

export default App;
