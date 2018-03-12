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
  constructor (props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.dataForTableOne);
    return (
      <div className={classes.root}>
      <TableSelection className={classes.flex} dataToDisplay={this.props.dataForTableOne}/>
            <IconButton>
              <SwapHoriz />
            </IconButton>
        <TableSelection className={classes.flex} dataToDisplay={this.props.dataForTableOne}/>
        </div>
    )
  }
}

TablesSelectStudents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablesSelectStudents);