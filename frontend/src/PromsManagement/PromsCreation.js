import React, { Component } from 'react'
import '../Style/PromsCreation.css'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import cookie from 'react-cookies'
import TablesSelectStudents from './TablesSelectStudents'
import { ToastContainer } from 'react-toastify'
import { getAllUsers, setPromosInfos } from '../UsefulFuncVar/ApiCall'

class PromsCreation extends Component {
  constructor(props){
    super(props);
  this.state = {
    token: cookie.load('token'),
    nomPromo:'',
    responsable:'',
    dataForTableOne: [],
    dataForTableTwo: []
  }
}

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  handleClickCreateProm (event) {
    setPromosInfos(this.state.nomPromo, this.state.responsable, this.state.token, this.state.dataForTableTwo);
  }

  componentDidMount () {
    getAllUsers(this.state.token).then((allUsers) => this.setState({dataForTableOne: allUsers}));
    // TODO : Utiliser des requêtes definies dans api call pour mettre les bons users dans les tables
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
          </form>
        </div>
        <div className = "blocsUtilisateurs">
          {!(this.state.dataForTableOne === undefined || this.state.dataForTableOne.length === 0) ?
            <TablesSelectStudents dataForTableOne={this.state.dataForTableOne}
            dataForTableTwo={this.state.dataForTableTwo}/>
            : "Pas d'utilisateur"}
        </div>
        <div>
          <Button primary={true} color="secondary" variant="raised"
                  onClick={(event) => this.handleClickCreateProm(event)}>
            Créer
          </Button>
        </div>

      </div>
    );
  }
}

export default PromsCreation;
