import React, { Component } from 'react';
import './Style/MyInfoStyle.css';
import imageTest from './photoCentrale.jpg';
import Button from 'material-ui/Button';
import {FormControl, IconButton, Input, InputAdornment, InputLabel, withStyles} from "material-ui";
import {Visibility, VisibilityOff} from "material-ui-icons";
import red from 'material-ui/colors/red';

const styles = ({
  Prenom: {
    backgroundColor: 'red',
  },

  root: {
    backgroundColor: 'red',
  },
});

class MyInformations extends Component {
  state = {
    password: '',
    showPassword: false,
    password2: '',
    showPassword2: false,
    password3: '',
    showPassword3: false,
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
  };

  render() {

    return (

      <div className="App" style = {styles}>



        <div className="App-header">

          <img src={imageTest} className="App-logo" alt="logo" />
          <div><Button className="BouttonImporterPhoto" onClick={this.importerPhoto}>Importer photo</Button></div>
          <div><h2 className="Nom" > Nom </h2>
            <h2 className="Prenom"> Prénom </h2></div>

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

          <Button>Modifier le mot de passe</Button>


        </div>

      </div>

    );

  }

}

export default withStyles(styles)(MyInformations);