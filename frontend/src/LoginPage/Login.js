import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import PageAccueilPerso from '../MyHomepageLinkapp/PageAccueilPerso';
import ReactDOM from "react-dom";
import axios from 'axios';
import { Button } from 'material-ui'


class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:''
        }
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title="Page de connexion"
                        />
                      <TextField
                        label="Entrez votre identifiant"
                        placeholder="Identifiant"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        onChange={(event, newValue) => this.setState({username: newValue})}
                      />
                        <br/>
                      <TextField
                        label="Entrez votre mot de passe"
                        placeholder="Mot de passe"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        onChange={(event, newValue) => this.setState({password: newValue})}
                      />
                        <br/>
                        <Button primary={true} style={style} variant="raised"
                                      onClick={(event) => this.handleClick(event)}>
                          Envoyer
                        </Button>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event)
    {
        console.log("event", event)
        console.log(this.state.username, this.state.password);

        var apiBaseUrl = "https://linkapp.ebm.nymous.io/api/";
        var donneesFormulaire={
            "username":this.state.username,
            "password":this.state.password
        }
        ReactDOM.render(<PageAccueilPerso parentContext={this}/>, document.getElementById('root'));
        axios.post(apiBaseUrl+'signin', this.creerStructureFormulaire(donneesFormulaire), {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .then(function (response) {
                console.log(response);

                if(response.status === 200){
                    console.log("Login successfull");
                    ReactDOM.render(<PageAccueilPerso parentContext={this}/>, document.getElementById('root'));
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

const style = {
    margin: 15,
};
export default Login;