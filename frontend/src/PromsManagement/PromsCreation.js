import React, { Component } from 'react'
import '../Style/PromsCreation.css'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import cookie from 'react-cookies'
import axios from 'axios/index'
import TablesSelectStudents from './TablesSelectStudents'

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

    axios.post(apiBaseUrl+'promos', donneesFormulaire, {
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
    //var apiBaseUrl = "http://localhost:3000/api/";
    /* var dataToProceed = axios.get(apiBaseUrl + 'users/allusers', {
      headers: {'Authorization': this.state.token}
    }); */

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
              onChange={this.handleChange('nomPromo')}/>
            </div>
            <div>
              <TextField
                id="pseudoResponsable"
                label="Pseudo du responsable"
                margin="normal"
                onChange={this.handleChange('responsable')}/>
            </div>
            <Button color="primary"
            onClick={(event) => this.handleClickCreateProm(event)}>
              Ajouter
            </Button>
          </form>
        </div>
        <div classname = "listesUtilisateurs">
          <TablesSelectStudents parentContext={this} />
        </div>

      </div>
    );
  }

}

/* TODO : faire passer dataToProceed dans props */

export default CreerNouveauGroupe;
