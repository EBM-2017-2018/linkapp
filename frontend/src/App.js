import React, { Component } from 'react'
import './App.css'
import LoginScreen from './LoginPage/LoginScreen'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import theme from './theme'

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            loginPage:[],
            uploadScreen:[]
        }
    }
    componentWillMount(){
        var loginPage =[];
        loginPage.push(<LoginScreen parentContext={this} appContext={this.props.parentContext} />);
        this.setState({
            loginPage:loginPage
        })
    }

    render() {
        return (
          <MuiThemeProvider theme={theme}>
            <div className="App">
                {this.state.loginPage}
                {this.state.uploadScreen}
            </div>
          </MuiThemeProvider>
        );
    }
}

export default App;