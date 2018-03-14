import React, { Component } from 'react'
import '../Style/MyInfoStyle.css'
import imageTest from './photoProfil.jpg'
import Button from 'material-ui/Button'
import { FormControl, IconButton, Input, InputAdornment, InputLabel, withStyles } from 'material-ui'
import { Visibility, VisibilityOff } from 'material-ui-icons'
import cookie from 'react-cookies'
import axios from 'axios/index'

class MyInformations extends Component {
  state = {
    prenom:'Prénom1',
    nom: 'Nom1',
    password: '',
    showPassword: false,
    password2: '',
    showPassword2: false,
    password3: '',
    showPassword3: false,
    token: cookie.load("token")
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChange2 = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleChange3 = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleMouseDownPassword2 = event => {
    event.preventDefault();
  };

  handleMouseDownPassword3 = event => {
    event.preventDefault();
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowPasssword2 = () => {
    this.setState({ showPassword2: !this.state.showPassword2 });
  };

  handleClickShowPasssword3 = () => {
    this.setState({ showPassword3: !this.state.showPassword3 });
  };

  importerPhoto = () => {
    console.log("Ecrire la fonction qui permet de changer sa photo");
      //var selectedFile = document.getElementById('input').files[0];
  };

    importerNom = () => {
        console.log("Ecrire la fonction qui permet d'importer le nom");
    };

    importerPrenom = () => {
        console.log("Ecrire la fonction qui permet d'importer le prenom");
    };

  render() {

    return (

      <div className="App">

          <h1>  {this.state.prenom+" "+this.state.nom} </h1>
          <div className= "BlocPrincipalAppMyInformations" >

        <div className="App-header">
            <div className="BlocPhoto">
          <div><img src={imageTest} className="App-logo" alt="logo" /></div>
            <input
                accept="image/*"
                className="BouttonImporterPhoto"
                id="raised-button-file"
                type="file"
            />
            <label htmlFor="raised-button-file" className="BouttonChangementPhotoProfil">
                <Button variant="raised" component="span" className="BouttonChangementPhotoProfil" onClick={this.importerPhoto} >
                    Changer sa photo de profil
                </Button>
            </label>
            </div>

        </div>

        <div>

          <FormControl className="champMotDePasse">
            <InputLabel htmlFor="password">Ancien mot de passe</InputLabel>
            <Input
              id="adornment-password"
              type={this.state.showPassword ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPasssword}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />

          </FormControl>

          <div>
            <FormControl className="champMotDePasse">
              <InputLabel htmlFor="password2">Nouveau mot de passe</InputLabel>
              <Input
                id="adornment-password2"
                type={this.state.showPassword2 ? 'text' : 'password2'}
                value={this.state.password2}
                onChange={this.handleChange2('password2')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword2}
                      onMouseDown={this.handleMouseDownPassword2}
                    >
                      {this.state.showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>

          <FormControl className="champMotDePasse">
            <InputLabel htmlFor="password3">Confirmer nouveau MDP</InputLabel>
            <Input
              id="adornment-password3"
              type={this.state.showPassword3 ? 'text' : 'password3'}
              value={this.state.password3}
              onChange={this.handleChange3('password3')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPasssword3}
                    onMouseDown={this.handleMouseDownPassword3}
                  >
                    {this.state.showPassword3 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
            <div>
          <Button onClick={(event) => this.handleClickChangePassword(event)}>Modifier le mot de passe</Button>
            </div>

        </div>
          </div>

      </div>

    );

  }

  handleClickChangePassword (event) {
    var apiBaseUrl = "http://localhost:3000/api/";
    var donneesFormulaire={
      "password":this.state.password,
      "newPassword": this.state.password2
    }

    axios.post(apiBaseUrl+'updatePassword', this.creerStructureFormulaire(donneesFormulaire), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.state.token}
    })
      .then(function (response) {
        console.log(response);

        if(response.status === 200){
          var token = response.data.token;
          cookie.save('token', token, {path: '/'});
          console.log("Password changed");
          console.log(response.data.token);
          // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  creerStructureFormulaire(donneesFormulaire) {
    var structureFormulaire = [];
    for (var proprietes in donneesFormulaire) {
      var encodedKey = encodeURIComponent(proprietes);
      var encodedValue = encodeURIComponent(donneesFormulaire[proprietes]);
      structureFormulaire.push(encodedKey + "=" + encodedValue);
    }
    structureFormulaire = structureFormulaire.join("&");
    return structureFormulaire;
  }
}

export default MyInformations;