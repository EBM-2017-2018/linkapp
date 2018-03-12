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
    'responsable':'',
    'dataForTableOne': []
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

  componentDidMount () {
    let apiBaseUrl = "http://localhost:3000/api/";
    axios.get(apiBaseUrl + 'users/allusers', {
      headers: {'Authorization': this.state.token}
    }).then(response => this.setState({dataForTableOne: response.data.users}));
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
        <div className = "listesUtilisateurs">
          {!(this.state.dataForTableOne === undefined || this.state.dataForTableOne.length === 0) ? <TablesSelectStudents dataForTableOne={this.state.dataForTableOne} /> : "Pas d'utilisateur"}
        </div>

      </div>
    );
  }
}

export default CreerNouveauGroupe;
