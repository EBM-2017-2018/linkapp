import React, { Component } from 'react'
import '../Style/PageAccueilPerso.css'
import MenuNavigationLinkapp from './MenuNavigationLinkapp'
import logo from '../Images/IconeApp.png'
import { AppBar, IconButton, MenuItem, withStyles } from 'material-ui'
import ApplicationIcon from './ApplicationIcon'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Menu from 'material-ui/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import AccountCreation from '../AccountManagement/AccountCreation'
import MyInformations from '../MyAccount/MyInformations'
import PropTypes from 'prop-types'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

class PageAccueilPerso extends Component {

  constructor (props) {
    super(props);
    this.token = props.token;
    this.state = {
      anchorEl: null,
      displayedScreen: 'Mes applications'
    };
  }

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
  this.setState({displayedScreen: event.target.textContent});
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

      return (
          <div className="pageAccueilPerso">
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <Typography variant="title" color="inherit" className={classes.flex}>
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
                <MenuNavigationLinkapp menuClick={this.handleClickMenuNav.bind(this)} />
              </div>
              <div className="centralBloc">
                {this.state.displayedScreen === 'Mes applications' && (
                  <div className="myApplications">
                    <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app1"/>
                    <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app2"/>
                    <ApplicationIcon link="https://www.eurosport.fr" srcImg={logo} nameApp="app3"/>
                    <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app4"/>
                    <ApplicationIcon link="https://www.google.fr" srcImg={logo} nameApp="app5"/>
                  </div>)
                }

                {this.state.displayedScreen === 'Gestion des comptes' && (
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

PageAccueilPerso.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageAccueilPerso);
