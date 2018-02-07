import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Login from './Login';


class Register extends Component {
    constructor(props){
        super(props);
        this.state={
            first_name:'',
            last_name:'',
            email:'',
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
                            title="Register"
                        />
                        <TextField
                            hintText="Entrez le prenom"
                            floatingLabelText="Prenom"
                            onChange={(event, newValue) => this.setState({first_name: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Enter le nom"
                            floatingLabelText="Nom"
                            onChange={(event, newValue) => this.setState({last_name: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Entrez l'email"
                            type="email"
                            floatingLabelText="Email"
                            onChange={(event, newValue) => this.setState({email: newValue})}
                        />
                        <br/>
                        <TextField
                            hintText="Entrez l'identifiant"
                            type="username"
                            floatingLabelText="Identifiant"
                            onChange={(event, newValue) => this.setState({username: newValue})}
                        />
                        <br/>
                        <TextField
                            type="password"
                            hintText="Entrez le mot de passe"
                            floatingLabelText="Mot de passe"
                            onChange={(event, newValue) => this.setState({password: newValue})}
                        />
                        <br/>
                        <RaisedButton label="Valider" primary={true} style={style}
                                      onClick={(event) => this.handleClick(event)}/>
                    </div>
                </MuiThemeProvider>
            </div>
        );
    }

    handleClick(event){
        console.log("event", event); // TODO : delete these two lines
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.username,this.state.password);

        // TODO:check for empty values before hitting submit
        var apiBaseUrl = "https://linkapp.ebm.nymous.io/api/";
        console.log("values",this.state.first_name,this.state.last_name,this.state.email,this.state.password);
        //To be done:check for empty values before hitting submit
        var self = this;
        var donneesFormulaire={
            "prenom": this.state.first_name,
            "nom":this.state.last_name,
            "email":this.state.email,
            "username":this.state.username,
            "password":this.state.password,
            "role":"etudiant"
        }

        axios.post(apiBaseUrl+'/signup', donneesFormulaire, this.creerStructureFormulaire(donneesFormulaire))
            .then(function (response) {
                console.log(response);
                if(response.data.code === 200){
                    //  console.log("registration successfull");
                    var loginscreen=[];
                    // TODO : changement d'ecran avec ReactDOM
                    loginscreen.push(<Login parentContext={this}/>);
                    var loginmessage = "Pas encore inscrit. Inscrivez-vous";
                    self.props.parentContext.setState({loginscreen:loginscreen,
                        loginmessage:loginmessage,
                        buttonLabel:"Register",
                        isLogin:true
                    });
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

export default Register;