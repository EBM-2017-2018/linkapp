import React, { Component } from 'react';
import './PageAccueilPerso.css';
import MenuNavigationLinkapp from "./MenuNavigationLinkapp";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './IconeApp.png';

class PageAccueilPerso extends Component {

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
                <a href="https://google.com"><img src={logo} className="application" alt="app1"/></a>
                <a href="https://google.com"><img src={logo} className="application" alt="app2"/></a>
                <a href="https://google.com"><img src={logo} className="application" alt="app3"/></a>
                <a href="https://google.com"><img src={logo} className="application" alt="app4"/></a>
                <a href="https://google.com"><img src={logo} className="application" alt="app5"/></a>
                </div>
            </div>
        );
    }

}

export default PageAccueilPerso;
