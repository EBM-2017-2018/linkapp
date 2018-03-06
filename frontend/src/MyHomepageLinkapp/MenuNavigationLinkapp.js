import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import { Menu, MenuItem } from 'material-ui'

const style = {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
};

class MenuNavigationLinkapp extends Component {
    render () {
        return (
            <div>
                <Paper style={style}>
                    <Menu>
                      <MenuItem>Mes applications</MenuItem>
                      <MenuItem>Gestion des comptes</MenuItem>
                      <MenuItem>Gestion des promos</MenuItem>
                      <MenuItem>Emploi du temps</MenuItem>
                    </Menu>
                </Paper>
            </div>
        );
    };

    handleClick(event) {
        console.log("kawa");
        // TODO : faire marcher ce handleClick
    }
}

export default MenuNavigationLinkapp;
