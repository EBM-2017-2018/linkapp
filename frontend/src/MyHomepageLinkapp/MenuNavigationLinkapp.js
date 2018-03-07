import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { MenuItem, MenuList } from 'material-ui'
import ReactDOM from 'react-dom'
import AccountCreation from '../AccountManagement/AccountCreation'

class MenuNavigationLinkapp extends Component {
    render () {
        return (
              <Paper>
                  <MenuList>
                    <MenuItem value='app' onClick={this.props.menuClick}>Mes applications</MenuItem>
                    <MenuItem value='AccountMgt' onClick={this.props.menuClick}>Gestion des comptes</MenuItem>
                    <MenuItem value='PromsMgt' onClick={this.props.menuClick}>Gestion des promos</MenuItem>
                    <MenuItem value='Agenda' onClick={this.props.menuClick}>Emploi du temps</MenuItem>
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
