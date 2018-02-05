import React from 'react';
import { Component} from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

const style = {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
};

class MenuNavigationLinkapp extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div>
                <Paper style={style}>
                    <Menu>
                        <MenuItem primaryText="Mes applications"/>
                        <MenuItem primaryText="Gestion des comptes"/>
                        <MenuItem primaryText="Gestion des promos"/>
                        <MenuItem primaryText="Emploi du temps"/>
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