import React, { Component } from 'react'
import TableSelection from './TableSelection'
import { IconButton, withStyles } from 'material-ui'
import { SwapHoriz } from 'material-ui-icons'
import PropTypes from 'prop-types'
import '../Style/PromsCreation.css'

const styles = ({
});


class TablesSelectStudents extends Component {

  render() {
    const { classes } = this.props;
    console.log(this.props.dataForTableOne);
    return (
      <div className='tablesContainer'>
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