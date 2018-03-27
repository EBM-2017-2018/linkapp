/* Defines TableSelectStudent which manages the users' movements in and out a specific prom
* when SwapHoriz button is clicked*/

import React, { Component } from 'react'
import TableSelection from './TableSelection'
import { IconButton, withStyles } from 'material-ui'
import { SwapHoriz } from 'material-ui-icons'
import PropTypes from 'prop-types'
import '../Style/PromsCreation.css'

const styles = ({
});


class TablesSelectStudents extends Component {

  /* Sends to parent what is to delete in table one and two
  * (ie. what needs to be swapped from one table to the other) */
  onSwapButtonClick = () => {
    let toDeleteTableOne = this.tableOne.getTableSelectedElements();
    let toDeleteTableTwo = this.tableTwo.getTableSelectedElements();
    this.props.dataTableUpdater(toDeleteTableOne, toDeleteTableTwo);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className='tablesContainer'>
        <TableSelection tableRef={el => {this.tableOne = el;}}
                        nameTable={"Non membres"}
                        className={classes.flex}
                        dataToDisplay={this.props.dataForTableOne}/>
        <IconButton onClick={this.onSwapButtonClick}>
          <SwapHoriz />
        </IconButton>
        <TableSelection tableRef={el => {this.tableTwo = el;}}
                        nameTable={"Membres de la promo"}
                        className={classes.flex}
                        dataToDisplay={this.props.dataForTableTwo}/>
      </div>
    )
  }
}

TablesSelectStudents.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablesSelectStudents);