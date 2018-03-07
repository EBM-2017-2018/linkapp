import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import PageAccueilPerso from '../MyHomepageLinkapp/PageAccueilPerso'
import ReactDOM from 'react-dom'
import axios from 'axios'
import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MuiThemeProvider,
  Toolbar,
  Typography,
  withStyles
} from 'material-ui'
import theme from '../theme'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import cookie from 'react-cookies'


const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
});

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
                              onClick={(event) => this.handleClick(event)}>
                  Envoyer
                </Button>
            </div>
        );
    }

    handleClick(event)
    {
        console.log("event", event) // TODO : delete this
        console.log(this.state.username, this.state.password);

        var apiBaseUrl = "http://localhost:3000/api/";
        var donneesFormulaire={
            "username":this.state.username,
            "password":this.state.password
        }

        axios.post(apiBaseUrl+'signin', this.creerStructureFormulaire(donneesFormulaire), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function (response) {
                console.log(response);
                console.log("barbapapa");

                if(response.status === 200){
                  var token = response.data.token;
                  cookie.save('token', token, {path: '/'});
                    console.log("Login successfull");
                    ReactDOM.render(<MuiThemeProvider theme={theme}>
                      <PageAccueilPerso parentContext={this} token={token}/>
                    </MuiThemeProvider>,
                      document.getElementById('root'));
                    console.log(response.data.token);
                    // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);