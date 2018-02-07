import React, { Component } from 'react';
import './PageAccueilPerso.css';
import MenuNavigationLinkapp from "./MenuNavigationLinkapp";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './IconeApp.png';
import {AppBar, IconButton, IconMenu, MenuItem} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class PageAccueilPerso extends Component {

    render() {
        return (
            <div className="PageAccueilPerso">
                <MuiThemeProvider>
                    <AppBar title="Linkapp"
                    iconElementRight={<IconMenu
                        iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
                        }
                        targetOrigin={{horizontal: 'right', vertical: 'top'}}
                        anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                        <MenuItem primaryText="Mes informations" />
                        <MenuItem primaryText="Mon emploi du temps" />
                    </IconMenu>}/>
                </MuiThemeProvider>
              <div id="appAndMenuContainer">
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
            </div>
        );
    }

}

export default PageAccueilPerso;
