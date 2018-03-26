/* Defines the component used to modify your password or profile picture */

import React, { Component } from 'react'
import '../Style/MyInfoStyle.css'
import imageTest from '../Images/photoProfil.jpg'
import Button from 'material-ui/Button'
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from 'material-ui'
import { Visibility, VisibilityOff } from 'material-ui-icons'
import cookie from 'react-cookies'
import { toast, ToastContainer } from 'react-toastify'
import { getPicture, getUserInfos, updatePassword, uploadPicture } from '../Utils/ApiCall'

class MyInformations extends Component {
  state = {
    username:cookie.load('username'),
    prenom:'',
    nom: '',
      role: '',
    password: '',
    showPassword: false,
    password2: '',
    showPassword2: false,
    password3: '',
    showPassword3: false,
    token: cookie.load("token"),
    profilePic: imageTest,
  };

  /* Updates in real time state values when text is written in textfields */
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  /* Changes boolean value of showPassword */
  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowPassword2 = () => {
    this.setState({ showPassword2: !this.state.showPassword2 });
  };

  handleClickShowPassword3 = () => {
    this.setState({ showPassword3: !this.state.showPassword3 });
  };

  /* Upload picture */
  importerPhoto = (event) => {
      if(!event.target.files) {
        console.log("opération annulée");
        return;
      }
      const data = new FormData();
      data.append('file', event.target.files[0]);

      uploadPicture(this.state.username, data).then((link) => {
        this.setState({
          profilePic: link+'?t='+ new Date().getTime(),
        });
      }).catch(error => console.log(error));
  };

  componentWillMount(){
    // Get user info to display it : first general infos and then picture
    getUserInfos(this.state.token, this.state.username).then(userInfo => {
      getPicture(this.state.token, this.state.username).then(link => {
        this.setState({
          nom: userInfo.nom,
          prenom: userInfo.prenom,
          role : userInfo.role,
          profilePic: link,
        });
      }).catch(error => console.log(error));
    }).catch(error => console.log(error));
  }


  render() {

    return (
        <div>

      <div className="App">
        <ToastContainer />

        ﻿ <h1>  {this.state.prenom+" "+this.state.nom} </h1>
        <div className= "BlocPrincipalAppMyInformations" >

        <div className="App-header">
          ﻿<div className="BlocPhoto">
          <div><img src={this.state.profilePic} className="App-logo" alt="logo" /></div>
          <input
            accept="image/*"
            className="BouttonImporterPhoto"
            id="raised-button-file"
            type="file"
            onChange={this.importerPhoto}
          />
          <label htmlFor="raised-button-file" className="BouttonChangementPhotoProfil">
            <Button variant="raised" component="span" className="BouttonChangementPhotoProfil" >
              Changer sa photo de profil
            </Button>
          </label>
        </div>


        </div>

        <div>
          <div>
            <p> {"Status: "+this.state.role}</p>
          </div>
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
                    onClick={this.handleClickShowPassword}
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
                onChange={this.handleChange('password2')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPassword2}
                      onMouseDown={this.handleMouseDownPassword}
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
              onChange={this.handleChange('password3')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={this.handleClickShowPassword3}
                    onMouseDown={this.handleMouseDownPassword}
                  >
                    {this.state.showPassword3 ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <br/>

          <Button onClick={(event) => this.handleClickChangePassword(event)}>Modifier le mot de passe</Button>

        </div>
        </div>

      </div>
        </div>
    );

  }

  /* Change password */
  handleClickChangePassword (event) {

    // check if both new password fields are not equals
    if (this.state.password2 !== this.state.password3) {
      toast.error("You typed two different passwords", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });
    }

    else {
      updatePassword(this.state.token, this.state.password, this.state.password2).catch(error => console.log(error));
    }
  }
}

export default MyInformations;
