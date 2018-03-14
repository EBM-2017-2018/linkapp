import React, { Component } from 'react'
import '../Style/MyInfoStyle.css'
import imageTest from '../Images/photoProfil.jpg'
import Button from 'material-ui/Button'
import { FormControl, IconButton, Input, InputAdornment, InputLabel, withStyles } from 'material-ui'
import { Visibility, VisibilityOff } from 'material-ui-icons'
import cookie from 'react-cookies'
import axios from 'axios/index'
import { toast, ToastContainer } from 'react-toastify'
import GlobalVarHandler, { creerStructureFormulaire } from '../UsefulFuncVar/UsefulFuncVar'

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
    token: cookie.load("token"),
    profilePic: imageTest,
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

  importerPhoto = (event) => {
      const data = new FormData();
      data.append('username', 'root');
      data.append('file', event.target.files[0]);
      //TODO récupérer username
      axios.post(GlobalVarHandler.apiBaseUrl+'pictures/upload', data).then((response) => {
        if( response.status === 200) {
          toast.success("photo mise en ligne", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
        else {
          toast.error("erreur durant la mise en ligne de la photo", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      });
  };
  componentDidMount(){
    //TODO modifier en fct de l'username
    axios.get(GlobalVarHandler.apiBaseUrl+'pictures/file/test', {
      headers: {
        'Authorization': this.state.token,
        'Content-Type':'multipart/form-data',
      }
    })
      .then((data) => {
        console.log(data);
        if( data.status === 200) {
         /* this.setState({
            profilePic: `data:${data.headers["content-type"]};base64,${data.data}`,
          });*/
          this.setState({
            profilePic: GlobalVarHandler.apiBaseUrl+'pictures/file/test'})
        }
      });
  }
  render() {

    return (
        <div>

      <div className="App">
        <ToastContainer />


        <div className="App-header">

          <img  src={this.state.profilePic} className="App-logo" alt="logo" />
          <div>
            <Input type="file" className="BouttonImporterPhoto" onClick={this.importerPhoto}>
              Importer photo
            </Input>
          </div>
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
          <br/>

          <Button onClick={(event) => this.handleClickChangePassword(event)}>Modifier le mot de passe</Button>


        </div>

      </div>

    );

  }

  handleClickChangePassword (event) {
    let apiBaseUrl = GlobalVarHandler.apiBaseUrl;
    let updatePasswordUrl = GlobalVarHandler.updatePasswordUrl;
    let donneesFormulaire={
      "password":this.state.password,
      "newPassword": this.state.password2
    }

    axios.post(apiBaseUrl+updatePasswordUrl, creerStructureFormulaire(donneesFormulaire), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.state.token}
    })
      .then(function (response) {
        console.log(response);

        if(response.status === 200){
          var token = response.data.token;
          cookie.save('token', token, {path: '/'});
          toast.success("Mot de passe modifié", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
          console.log("Password changed");
          console.log(response.data.token);
          // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }
}

export default withStyles(styles)(MyInformations);
