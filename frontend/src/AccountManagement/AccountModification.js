import React, { Component } from 'react'
import { Button, TextField, withStyles } from 'material-ui'
import PropTypes from 'prop-types'
import cookie from 'react-cookies'
import { ToastContainer } from 'react-toastify'
import GlobalVarHandler from '../UsefulFuncVar/UsefulFuncVar'
import {updateUserInfos} from '../UsefulFuncVar/ApiCall'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
});

const roles = [
  {
    value: 'etudiant',
    label: 'Etudiant',
  },
  {
    value: 'intervenant',
    label: 'Intervenant',
  },
  {
    value: 'administrateur',
    label: 'Administrateur',
  },
];

class AccountModification extends Component {
  constructor(props){
    super(props);
    this.state={
      username:this.props.user.username,
      role:this.props.user.role,
      nom:this.props.user.nom,
      prenom:this.props.user.prenom,
      email:this.props.user.email,
      displayedComponent:'addAccount',
      token: cookie.load('token')
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick(event)
  {
    var donneesFormulaire={
      "username":this.state.username,
      "role":this.state.role,
      "nom": this.state.nom,
      "prenom": this.state.prenom,
      "email": this.state.email
    };

    updateUserInfos(this.state.token, donneesFormulaire);
  }

  render () {
    const { classes } = this.props;

    return(
      <div>
        <ToastContainer/>
        <h2>Pour Modifier les informations de l'utilisateur sélectionné, remplissez le formulaire ci-dessous</h2>
        <div className="addUserForm">
          <TextField
        label="Identifiant"
        placeholder="Identifiant"
        value={this.state.username}
        disabled={true}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        onChange={this.handleChange('username')}
        />
        <br/>
          <TextField
            id="select-role"
            select
            label="Role"
            className={classes.textField}
            value={this.state.role}
            onChange={this.handleChange('role')}
            SelectProps={{
              native: true,
              MenuProps: {
                className: classes.menu,
              },
            }}
            margin="normal"
          >
            {roles.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        <br/>
          <TextField
            label="Nom"
            placeholder="Nom"
            value={this.state.nom}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            onChange={this.handleChange('nom')}
          />
          <br/>
          <TextField
            label="Prenom"
            placeholder="Prenom"
            value={this.state.prenom}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            onChange={this.handleChange('prenom')}
          />
          <br/>
          <TextField
            label="Email"
            placeholder="Email"
            value={this.state.email}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            onChange={this.handleChange('email')}
          />
          <br/>
          <Button primary={true} variant="raised" color="secondary"
                  onClick={(event) => this.handleClick(event)}>
            Valider l'ajout
          </Button>
        </div>
      </div>
    );
  }
}

AccountModification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountModification);
