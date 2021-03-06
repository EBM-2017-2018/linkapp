/* TabContainer is a two options-tab, some changes are needed to enable the creation of more (or less) than two tabs */

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    backgroundColor: theme.palette.background.paper,
  },
});

class SimpleTabs extends React.Component {
  constructor (props) {
   super(props);

    this.state = {
      value: 0,
    };
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount () {
    this.props.onRef(undefined);
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.tabChangeHandler(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange}>
            <Tab value={0} label={this.props.nameTabs[0]} />
            <Tab value={1} label={this.props.nameTabs[1]} />
          </Tabs>
        </AppBar>
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
