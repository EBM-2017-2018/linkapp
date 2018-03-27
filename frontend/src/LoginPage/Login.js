import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import { ToastContainer } from 'react-toastify'
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
import { getTokenOnLogin } from '../Utils/ApiCall'

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
                onKeyPress={event => this.add(event)}
              />
                <br/>
              <FormControl className={classNames(classes.margin, classes.textField)} autoComplete="on">
                <InputLabel htmlFor="password">Mot de Passe</InputLabel>
                <Input
                  id="adornment-password"
                  type={this.state.showPassword ? 'text' : 'password'}
                  value={this.state.password}
                  onChange={this.handleChange('password')}
                  onKeyPress={event => this.add(event)}
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
                              onClick={() => this.handleClick()}
                        onChange={event => {this.setState({query: event.target.value})}}
                onKeyPress={event => this.add(event)}
                >
                  Envoyer
                </Button>
            </div>
        );
    }

    add = (event) => {
      if(event.key === 'Enter'){
        this.handleClick();
    }};

    handleClick = () => {

      getTokenOnLogin(this.state.username, this.state.password)
        .then(token => this.props.appOnSuccessLogin(token))
        .catch(error => console.log(error));
    }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
