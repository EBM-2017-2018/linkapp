import React, { Component } from 'react'
import { Button, TextField, withStyles } from 'material-ui'
import PropTypes from 'prop-types'
import axios from 'axios/index'
import cookie from 'react-cookies'
import { toast, ToastContainer } from 'react-toastify'
import GlobalVarHandler, { creerStructureFormulaire } from '../UsefulFuncVar/UsefulFuncVar'

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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick(event)
  {

    let apiBaseUrl = GlobalVarHandler.apiBaseUrl;
    let signupUrl = GlobalVarHandler.signupUrl;
    var donneesFormulaire={
      "username":this.state.username,
      "password":this.state.password,
      "role":this.state.role,
      "nom": this.state.nom,
      "prenom": this.state.prenom,
      "email": this.state.email
    }

    axios.post(apiBaseUrl+signupUrl, creerStructureFormulaire(donneesFormulaire), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.state.token }
    })
      .then(function (response) {
        console.log(response);

        if(response.status === 200){
          console.log("Signup successfull");
          toast.success("utilisateur ajouté", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
        else if(response.status === 11000){
          alert("Username Already exists");
        }
        else if(response.status === 401){
          console.log("Wrong role");
          alert("Wrong role")
        }
        else{
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
            value="etudiant"
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
