/* Component that contains the form to create a new account */
import React, { Component } from 'react'
import { Button, TextField, withStyles } from 'material-ui'
import PropTypes from 'prop-types'
import cookie from 'react-cookies'
import { ToastContainer } from 'react-toastify'
import { setUserInfos } from '../Utils/ApiCall'

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

class AccountCreation extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      role:'etudiant',
      nom:'',
      prenom:'',
      email:'',
      displayedComponent:'addAccount',
      token: cookie.load('token')
    }
  }

  /* Function that changes the states variables everytime one form entry is being completed */
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  /* Creates a new account in the mongo DB */
  handleClick()
  {
    setUserInfos(this.state.token,
      this.state.username,
      this.state.password,
      this.state.role,
      this.state.nom,
      this.state.prenom,
      this.state.email);
  }

  render () {
    const { classes } = this.props;

    return(
      <div>
        <ToastContainer/>
        <h2>Pour ajouter un utilisateur, remplissez le formulaire ci-dessous</h2>
        <div className="addUserForm">
          <TextField
        label="Identifiant"
        placeholder="Identifiant"
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        onChange={this.handleChange('username')}
        />
        <br/>
        <TextField
          label="Mot de passe"
          placeholder="Mot de passe"
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          onChange={this.handleChange('password')}
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

AccountCreation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountCreation);
