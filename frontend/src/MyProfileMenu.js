import React, { Component } from 'react';
import {Menu, MenuItem, Paper} from "material-ui";

class MyProfileMenu extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isClicked:false
        }
    }

    render() {
        if (this.state.isClicked === false) return (null);
        else {
            this.setState({isClicked:true})
            return (
                <div>
                    <Paper style={style}>
                        <Menu>
                            <MenuItem primaryText="Mes informations"/>
                            <MenuItem primaryText="Mon emploi du temps"/>
                        </Menu>
                    </Paper>
                </div>
            )
        }
    }

    handleClick() {
        return(
            <div>
                <Paper style={style}>
                    <Menu>
                        <MenuItem primaryText="Mes informations"/>
                        <MenuItem primaryText="Mon emploi du temps"/>
                    </Menu>
                </Paper>
            </div>
        )
    }
}

const style = {
    display: 'inline-block',
    margin: '16px 32px 16px 0',
};

export default MyProfileMenu;