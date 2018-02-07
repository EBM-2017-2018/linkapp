import React, { Component } from 'react';
import './PageAccueilPerso.css';
import MenuNavigationLinkapp from "./MenuNavigationLinkapp";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './IconeApp.png';
import {AppBar, IconButton, IconMenu, MenuItem} from "material-ui";
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ApplicationIcon from './ApplicationIcon';

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
                  <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app1"/>
                  <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app2"/>
                  <ApplicationIcon link="https://www.eurosport.fr" srcImg={logo} nameApp="app3"/>
                  <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app4"/>
                  <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app5"/>
                </div>
              </div>
            </div>
        );
    }

}

export default PageAccueilPerso;
