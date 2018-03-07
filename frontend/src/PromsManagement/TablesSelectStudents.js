import React, { Component } from 'react'
import TableSelection from './TableSelection'
import { IconButton, withStyles } from 'material-ui'
import { SwapHoriz } from 'material-ui-icons'
import PropTypes from 'prop-types'


const styles = ({
  root: {
    flex: 1,
    flexDirection: 'column',
  },
});


class TablesSelectStudents extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
      <TableSelection className={classes.flex}/>
            <IconButton>
              <SwapHoriz />
            </IconButton>
        <TableSelection className={classes.flex}/>
        </div>
    )
  }
}

TablesSelectStudents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablesSelectStudents);