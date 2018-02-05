import React, { Component } from 'react';
import LoginScreen from "./LoginScreen";
import './PageAccueilPerso.css';
import MenuNavigationLinkapp from "./MenuNavigationLinkapp";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './IconeApp.png';

class PageAccueilPerso extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="PageAccueilPerso">
                <div id="bandeau">
                    <h1>Accueil Linkapp</h1>
                </div>
                <MuiThemeProvider>
                    <div>
                        <MenuNavigationLinkapp onClick={(event) => {this.handleClick(event)}} />
                    </div>
                </MuiThemeProvider>

            <div className="blocApplication">
                <a href="https://google.com"><img src={logo} className="application"/></a>
                <a href="https://google.com"><img src={logo} className="application"/></a>
                <a href="https://google.com"><img src={logo} className="application"/></a>
                <a href="https://google.com"><img src={logo} className="application"/></a>
                <a href="https://google.com"><img src={logo} className="application"/></a>
                </div>
            </div>
        );
    }

}

export default PageAccueilPerso;