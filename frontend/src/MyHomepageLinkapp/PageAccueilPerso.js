import React, { PureComponent } from 'react'
import '../Style/PageAccueilPerso.css'
import MenuNavigationLinkapp from './MenuNavigationLinkapp'
import logo from '../Images/IconeApp.png'
import logoClock from '../Images/logo-clock.png'
import { AppBar, Button, IconButton, MenuItem, withStyles, Tooltip } from 'material-ui'
import ApplicationIcon from './ApplicationIcon'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Menu from 'material-ui/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import MyInformations from '../MyAccount/MyInformations'
import PropTypes from 'prop-types'
import PromsManagementPage from '../PromsManagement/PromsManagementPage'
import AccountManagementPage from '../AccountManagement/AccountManagementPage'
import cookie from 'react-cookies'
import AppsMenu from './AppMenu'
import {Apps as AppsIcon} from 'material-ui-icons';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

class PageAccueilPerso extends PureComponent {

  constructor (props) {
    super(props);
    this.token = props.token;
    this.state = {
      anchorEl: null,
      appsAnchorEl: null,
      appsMenuOpen: false,
      myAccountMenuOpen: false,
      displayedScreen: 'Mes applications',
      query:'?token='+cookie.load('token')+'&username='+cookie.load('username'),
    };
  }

  handleMenu = event => {
    this.setState({
      anchorEl: event.currentTarget,
      myAccountMenuOpen: true,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      myAccountMenuOpen: false,
    });
  };

  handleClickPersonalMenu = (event) => {
    this.setState({displayedScreen: 'MyInformations'});
  };

  handleClickMenuNav = (event) => {
  this.setState({displayedScreen: event.target.textContent});
  };

  handleClickDeco = () => {
    cookie.remove('token', { path: '/' });
    cookie.remove('username', { path: '/' });
    this.props.deconnexionHandler();
  };

  handleAppsMenuClick = (event) => {
    this.setState({
      appsMenuOpen: true,
      appsAnchorEl: event.currentTarget,
    });
  };

  handleAppsMenuClose = () => {
    this.setState({
      appsMenuOpen: false,
      appsAnchorEl: null,
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    let open = this.state.myAccountMenuOpen;
    let appsMenuOpen = this.state.appsMenuOpen;
      return (
          <div className="pageAccueilPerso">
            <div className={classes.root}>
              <AppBar position="static">
                <Toolbar>
                  <Button color="inherit" onClick={this.handleClickDeco}>Se déconnecter</Button>
                  <Typography variant="title" color="inherit" className={classes.flex}>
                    Linkapp
                  </Typography>
                  <div>
                    <Tooltip id="personal-icon" title="Mon Compte">
                    <IconButton
                      className="myProfileIconButton"
                      aria-label="Mon compte"
                      aria-owns={open ? 'menu-appbar' : null}
                      aria-haspopup="true"
                      ref={node => this.button = node}
                      onClick={this.handleMenu}
                      color="inherit"
                    >
                      <AccountCircle />
                    </IconButton>
                    </Tooltip>
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
                  <Tooltip id="apps-icon" title="Applications">
                    <IconButton
                      color="inherit"
                      aria-label="Applications"
                      ref={node => this.button = node}
                      onClick={this.handleAppsMenuClick}>
                      <AppsIcon/>
                    </IconButton>
                  </Tooltip>
                  <AppsMenu
                    open={this.state.appsMenuOpen}
                    anchorEl={anchorEl}
                    closeCallback={this.handleAppsMenuClose}/>
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
                    <ApplicationIcon link={"https://oklm.ebm.nymous.io/"+this.state.query}
                                     srcImg={logo}
                                     nameApp="OKLM"/>
                    <ApplicationIcon link={"https://sagg.ebm.nymous.io/"+this.state.query}
                                     srcImg={logo}
                                     nameApp="Sagg"/>
                    <ApplicationIcon link={"https://redline.ebm.nymous.io/"+this.state.query}
                                     srcImg={logo}
                                     nameApp="Redline"/>
                    <ApplicationIcon link={"https://clock-livecoding.ebm.nymous.io/"+this.state.query}
                                     srcImg={logoClock}
                                     nameApp="CLOCK"/>
                    <ApplicationIcon link={"https://markus.ebm.nymous.io/"+this.state.query}
                                     srcImg={logo}
                                     nameApp="MarkUs"/>
                  </div>)
                }

                {this.state.displayedScreen === 'Gestion des comptes' && (
                  <div>
                    <AccountManagementPage parentContext={this}/>
                  </div>
                )
                }

                {this.state.displayedScreen === 'MyInformations' && (
                  <MyInformations parentContext={this} />
                )}
                {this.state.displayedScreen === 'Gestion des promos' && (
                  <PromsManagementPage parentContext={this} />
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
