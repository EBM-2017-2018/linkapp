import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { MenuItem, MenuList } from 'material-ui'
import ReactDOM from 'react-dom'
import AccountCreation from '../AccountManagement/AccountCreation'


const styles = theme => {
  paper: {
    marginRight: theme.spacing.unit * 2
  }
};

class MenuNavigationLinkapp extends Component {
    render () {
        return (
              <Paper className="paper">
                  <MenuList>
                    <MenuItem onClick={(event) => this.onClickMyApps(event)}>Mes applications</MenuItem>
                    <MenuItem onClick={(event) => this.props.onClick(event)}>Gestion des comptes</MenuItem>
                    <MenuItem onClick={(event) => this.handleClickPromsManagement(event)}>Gestion des promos</MenuItem>
                    <MenuItem onClick={(event) => this.handleClickAgenda(event)}>Emploi du temps</MenuItem>
                  </MenuList>
              </Paper>
        );
    };

    handleClickMyApps(event) {
        console.log("Mes Applications");
        // TODO : changer l'action
    }

  handleClickAccountManagement (event) {
    console.log("Management comptes", event);
    // super.handleClickAccountManagement(event);
    ReactDOM.render(<AccountCreation parentContext={this}/>, document.getElementById('blocApplication'));
  }

  handleClickPromsManagement (event) {
    console.log("Management promos");
  }

  handleClickAgenda (event) {
    console.log("Emploi du temps");
  }
}

export default MenuNavigationLinkapp;
