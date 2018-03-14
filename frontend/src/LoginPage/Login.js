import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import { toast, ToastContainer } from 'react-toastify'
import axios from 'axios'
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Toolbar,
  Typography,
  withStyles
} from 'material-ui'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import cookie from 'react-cookies'
import GlobalVarHandler, { creerStructureFormulaire } from '../UsefulFuncVar/UsefulFuncVar'

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

// TODO : document.location.pass à regarder pour connaître l'url de redirection

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            showPassword: false,
        }
    }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

    render() {
      const { classes } = this.props;

        return (
            <div className="root">
              <ToastContainer/>
                <AppBar position="static">
                  <Toolbar>
                    <Typography variant="title" color="inherit" className="titleAppBarLogin">
                        Page Login Linkapp
                    </Typography>
                  </Toolbar>
                </AppBar>
              <TextField
                label="Entrez votre identifiant"
                placeholder="Identifiant"
                InputLabelProps={{
                  shrink: true,
                }}
                margin="normal"
                onChange={this.handleChange('username')}
              />
                <br/>
              <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password">Mot de Passe</InputLabel>
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
                <br/>
                <Button primary={true} variant="raised" color="secondary"
                              onClick={(event) => this.handleClick(event)}
                        onChange={event => {this.setState({query: event.target.value})}}
                        onKeyPress={ (event) => {
                          if (event.key === 'Enter') {
                            this.handleClick(event)}
                        }
                        }>
                  Envoyer
                </Button>
            </div>
        );
    }

    handleClick(event)
    {
        let apiBaseUrl = GlobalVarHandler.apiBaseUrl;
        let signinUrl = GlobalVarHandler.signinUrl;
        let donneesFormulaire={
            "username":this.state.username,
            "password":this.state.password
        }

        console.log(apiBaseUrl);

        axios.post(apiBaseUrl+signinUrl, creerStructureFormulaire(donneesFormulaire), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then((response) => {

                if(response.status === 200){
                  let token = response.data.token;
                  cookie.save('token', token, {path: '/'});

                  this.props.appOnSuccessLogin(token);

                }
                else if(response.status === 401){
                    console.log("Username password do not match");
                    alert("username password do not match")
                }
                else{
                    console.log("Username does not exists");
                    alert("Username does not exist");
                }
            })
            .catch(function (error) {
              if(error.response.status === 401) toast.error(
                "Nom d'utilisateur ou mot de passe erroné", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 3000,
              });
                console.log(error.response);
            });
    }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
