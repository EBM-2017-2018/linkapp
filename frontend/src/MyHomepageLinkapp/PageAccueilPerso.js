import React, { Component } from 'react'
import './Style/PageAccueilPerso.css'
import MenuNavigationLinkapp from './MenuNavigationLinkapp'
import logo from './Images/IconeApp.png'
import { AppBar, IconButton, MenuItem } from 'material-ui'
import ApplicationIcon from './ApplicationIcon'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Menu from 'material-ui/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import ReactDOM from 'react-dom'
import AccountCreation from '../AccountManagement/AccountCreation'
import MyInformations from '../MyAccount/MyInformations'


const styles = theme => ({
  appAndMenuContainer: {
    display: 'flex',
  },

  appBarLinkapp: {
  flexGrow: 1,
  },

  nameApp: {
    flex: 1,
  },

  myProfileIconButton: {
    justifyContent: "flex-end",
  }

})


class PageAccueilPerso extends Component {

  state = {
    anchorEl: null,
    displayedScreen: 'app'
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickPersonalMenu = (event) => {
    this.setState({displayedScreen: 'MyInformations'});
  };

  handleClickMenuNav = (event) => {
  console.log(event);
  this.setState({displayedScreen: 'AccountMgt'});
  // ReactDOM.render(<AccountCreation parentContext={this}/>, document.getElementById('blocApplication'));
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

      return (
          <div className="pageAccueilPerso">
            <div className="appBarLinkapp">
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="title" color="inherit" className="nameApp">
                    Linkapp
                  </Typography>
                  <div>
                    <IconButton
                      className="myProfileIconButton"
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
                      <MenuItem onClick={(event) => {this.handleClickPersonalMenu(event)}}>Mon profil</MenuItem>
                      <MenuItem onClick={this.handleClose}>Mon emploi du temps</MenuItem>
                    </Menu>
                  </div>
                </Toolbar>
              </AppBar>
            </div>
            <div id="appAndMenuContainer">
              <div>
                <MenuNavigationLinkapp onClick={(event) => {this.handleClickMenuNav(event)}} />
              </div>
              <div className="blocApplication">
                {this.state.displayedScreen === 'app' && (
                  <div>
                    <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app1"/>
                    < ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app2"/>
                    <ApplicationIcon link="https://www.eurosport.fr" srcImg={logo} nameApp="app3"/>
                    <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app4"/>
                    <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app5"/>
                  </div>)
                }

                {this.state.displayedScreen === 'AccountMgt' && (
                  <div>
                    <AccountCreation parentContext={this}/>
                  </div>
                )
                }

                {this.state.displayedScreen === 'MyInformations' && (
                  <MyInformations parentContext={this} />
                )}
                </div>
            </div>
          </div>
      )
  }
  }

export default PageAccueilPerso;
