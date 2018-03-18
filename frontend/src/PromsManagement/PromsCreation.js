import React, { Component } from 'react'
import '../Style/PromsCreation.css'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import cookie from 'react-cookies'
import axios from 'axios/index'
import TablesSelectStudents from './TablesSelectStudents'
import { toast, ToastContainer } from 'react-toastify'
import GlobalVarHandler from '../UsefulFuncVar/UsefulFuncVar'
import { getAllUsers } from '../UsefulFuncVar/ApiCall'


class PromsCreation extends Component {
  constructor(props){
    super(props);
  this.state = {
    token: cookie.load('token'),
    nomPromo:'',
    responsable:'',
    dataForTableOne: []
  }
}

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickCreateProm (event) {
    let apiBaseUrl = GlobalVarHandler.apiBaseUrl;
    let setPromoUrl = GlobalVarHandler.setPromosUrl;
    var donneesFormulaire={
      "nomPromo":this.state.nomPromo,
      "responsable": this.state.responsable
    }

    axios.post(apiBaseUrl+setPromoUrl, donneesFormulaire, {
      headers: { 'Content-Type': 'application/json',
        'Authorization': this.state.token}
    })
      .then(function (response) {
        console.log(response);

        if(response.status === 200){
          var token = response.data.token;
          cookie.save('token', token, {path: '/'});
          toast.success("Promotion crée", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      })
      .catch(function (error) {
        if(error.response.status === 403) toast.error("Vous n'avez pas les droits pour cette opération", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
        console.log(error);
      });

  }

  componentDidMount () {
    getAllUsers(this.state.token).then((allUsers) => this.setState({dataForTableOne: allUsers}));
  }

  render() {

    return (
      <div className="AppNouveaugroupe">
        <ToastContainer />
        <div>
          <h1>Créer une nouvelle promo</h1>

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
        <div className = "blocsUtilisateurs">
          {!(this.state.dataForTableOne === undefined || this.state.dataForTableOne.length === 0) ? <TablesSelectStudents dataForTableOne={this.state.dataForTableOne} /> : "Pas d'utilisateur"}
        </div>

      </div>
    );
  }
}

export default PromsCreation;
