import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {GridList, Popover, withStyles} from 'material-ui';

import AppIcon from './AppIcon';
import logoClock from '../Images/logo-clock.png'
import logoMarkus from '../Images/logo-markus.png'
import logoOklm from '../Images/logo-oklm.png'
import logoSagg from '../Images/logo-sagg.png'
import logoRedline from '../Images/logo-redline.png'
import logoLinkapp from '../Images/logo-linkapp.png'
import cookie from 'react-cookies'
const styles = theme => ({
  root: {
    overflow: 'hidden',
    width: 300,
    padding: '20px 15px',
    backgroundColor: theme.palette.background.paper,
  }
});
const query ='?token='+cookie.load('token')+'&username='+cookie.load('username');
class AppsMenu extends PureComponent {

  static propTypes = {
    open: PropTypes.bool.isRequired,
    anchorEl: PropTypes.object,
    closeCallback: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  apps = [
    {
      name: 'OKLM',
      url: '//oklm.ebm.nymous.io'+query,
      logo: logoOklm
    },
    {
      name: 'Redline',
      url: '//redline.ebm.nymous.io'+query,
      logo: logoRedline
    },
    {
      name: 'Linkapp',
      url: '//linkapp.ebm.nymous.io'+query,
      logo: logoLinkapp
    },
    {
      name: 'Markus',
      url: '//markus.ebm.nymous.io'+query,
      logo: logoMarkus
    },
    {
      name: 'SAGG',
      url: '//sagg.ebm.nymous.io'+query,
      logo: logoSagg
    },
    {
      name: 'Livecoding',
      url: '//clock-livecoding.ebm.nymous.io'+query,
      logo: logoClock
    }
  ];

  render() {
    const {classes} = this.props;

    return (
      <Popover
        open={this.props.open}
        onClose={this.props.closeCallback}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}>
        <div className={classes.root}>
          <GridList cellHeight={100} cols={3}>
            {this.apps.map(app => (
              <AppIcon
                open={this.props.open}
                onClose={this.props.closeCallback}
                anchorEl={this.props.anchorEl}
                key={app.url}
                logo={app.logo}
                appName={app.name}
                href={app.url}
              />
            ))}
          </GridList>
        </div>
      </Popover>
    )
  }
}

export default withStyles(styles)(AppsMenu);
