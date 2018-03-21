import React, { Component } from 'react'
import TableSelection from './TableSelection'
import { IconButton, withStyles } from 'material-ui'
import { SwapHoriz } from 'material-ui-icons'
import PropTypes from 'prop-types'
import '../Style/PromsCreation.css'

const styles = ({
});


class TablesSelectStudents extends Component {

  onSwapButtonClick = () => {
    let toDeleteTableOne = this.tableOne.getTableSelectedElements();
    let toDeleteTableTwo = this.tableTwo.getTableSelectedElements();
    console.log(toDeleteTableTwo);
    this.props.dataTableUpdater(toDeleteTableOne, toDeleteTableTwo);
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.dataForTableOne);
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