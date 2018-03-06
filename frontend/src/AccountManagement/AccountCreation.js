import React, { Component } from 'react';
import { TextField } from 'material-ui'


class AccountCreation extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:''
    }
  }

  render () {
    return(
      <div>
        <h1>Pour ajouter un utilisateur, remplissez le formulaire ci-dessous</h1>
        <div className="addUserForm">
          <TextField
        label="Identifiant"
        placeholder="Identifiant"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        onChange={(event, newValue) => this.setState({username: newValue})}
        />
        <br/>
        <TextField
          label="Mot de passe"
          placeholder="Mot de passe"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          onChange={(event, newValue) => this.setState({password: newValue})}
        />
        <br/>
          <br/>
        </div>
      </div>
    );
  }
}

export default AccountCreation;