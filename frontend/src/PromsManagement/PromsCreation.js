import React, { Component } from 'react'
import '../Style/PromsCreation.css'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import Avatar from 'material-ui/Avatar'
import imageTest from '../Images/IconeApp.png'
import cookie from 'react-cookies'
import axios from 'axios/index'

class CreerNouveauGroupe extends Component {
  constructor(props){
    super(props);
  this.state = {
    'token': cookie.load('token'),
    'nomPromo':'',
    'responsable':''
  }
}

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickCreateProm (event) {
    var apiBaseUrl = "http://localhost:3000/api/";
    var donneesFormulaire={
      "nomPromo":this.state.nomPromo,
      "responsable": this.state.responsable
    }

    axios.post(apiBaseUrl+'promos', this.creerStructureFormulaire(donneesFormulaire), {
      headers: { 'Content-Type': 'application/json',
        'Authorization': this.state.token}
    })
      .then(function (response) {
        console.log(response);

        if(response.status === 200){
          var token = response.data.token;
          cookie.save('token', token, {path: '/'});
          console.log("Prom created");
          console.log(response.data.token);
          // self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div className="AppNouveaugroupe">
        <div>
          <h1>Créer un nouveau groupe</h1>

          <form noValidate autoComplete="off">
            <div>
              <TextField
                id="nomPromo"
                label="Nom de la promo"
                margin="normal"
              onChange={(event) => this.handleChange('nomPromo')}/>
            </div>
            <div>
              <TextField
                id="pseudoResponsable"
                label="Pseudo du responsable"
                margin="normal"
                onChange={(event) => this.handleChange('responsable')}/>
            </div>
            <Button color="primary"
            onClick={(event) => this.handleClickCreateProm(event)}>
              Ajouter
            </Button>
          </form>
        </div>
        <div classname = "listeUtilisateurs">
          <List>
            {[0, 1, 2, 3].map(value => (
              <ListItem key={value} dense button>
                <Avatar src={imageTest} />
                <ListItemText primary={`Etudiant ${value + 1}`} />
                <ListItemSecondaryAction>
                  <Checkbox
                  />
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </div>

      </div>
    );
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

export default CreerNouveauGroupe;
