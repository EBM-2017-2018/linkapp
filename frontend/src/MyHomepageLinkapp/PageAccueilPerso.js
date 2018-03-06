import React, { Component } from 'react';
import './Style/PageAccueilPerso.css';
import MenuNavigationLinkapp from "./MenuNavigationLinkapp";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import logo from './Images/IconeApp.png';
import {AppBar, IconButton, IconMenu, MenuItem} from "material-ui";
import ApplicationIcon from './ApplicationIcon';
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Menu from 'material-ui/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle';

class PageAccueilPerso extends Component {

  state = {
    anchorEl: null,
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

      return (
          <div className="PageAccueilPerso">
              <MuiThemeProvider>
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="title" color="inherit" className="nameApp">
                      Linkapp
                    </Typography>
                    <div>
                      <IconButton
                        aria-owns={open ? 'menu-appbar' : null}
                        aria-haspopup="true"
                        onClick={this.handleMenu}
                        color="inherit"
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        id="myProfileMenu"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose}
                      >
                        <MenuItem onClick={this.handleClose}>Mon profil</MenuItem>
                        <MenuItem onClick={this.handleClose}>Mon emploi du temps</MenuItem>
                      </Menu>
                    </div>
                  </Toolbar>
                </AppBar>
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
