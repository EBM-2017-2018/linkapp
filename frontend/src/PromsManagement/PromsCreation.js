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

    this.dataTableUpdater = this.dataTableUpdater.bind(this);

    this.state = {
      token: cookie.load('token'),
      nomPromo:'',
      responsable:'',
      dataForTableOne: [],
      dataForTableTwo: []
    }
}

  // Updates dataForTableOne and dataForTableTwo
  dataTableUpdater (toRemoveInTableOne, toRemoveInTableTwo){
    getAllUsers(this.state.token).then(allUsers => {
      let usernamesToRemoveOne = toRemoveInTableOne.map((el) => el.username);
      let usernamesToRemoveTwo = toRemoveInTableTwo.map((el) => el.username);
      let tableAllUsers = allUsers;
      let dataForTableOne = this.state.dataForTableOne;
      let dataForTableTwo = this.state.dataForTableTwo;

      for (let i=0; i<usernamesToRemoveTwo.length; i++) {
        let userInfo = tableAllUsers.filter(user => user.username===usernamesToRemoveTwo[i]);
        dataForTableOne.push(userInfo[0]);
        dataForTableTwo = dataForTableTwo.filter(user=>user.username!==usernamesToRemoveTwo[i]);
      }

      for (let i=0; i<usernamesToRemoveOne.length; i++) {
        let userInfo = tableAllUsers.filter(user => user.username===usernamesToRemoveOne[i]);
        dataForTableTwo.push(userInfo[0]);
        dataForTableOne = dataForTableOne.filter(user=>user.username!==usernamesToRemoveOne[i]);
      }

      this.setState({
        dataForTableOne: dataForTableOne,
        dataForTableTwo: dataForTableTwo
      });

    }).catch(error => console.log(error));
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  // Api call to create prom
  handleClickCreateProm (event) {
    let membersUsernames = this.state.dataForTableTwo.map(el => el.username);
    setPromosInfos(this.state.nomPromo, this.state.responsable, this.state.token, membersUsernames);
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
                                  dataForTableTwo={this.state.dataForTableTwo}
                                  dataTableUpdater={this.dataTableUpdater}/>
            : "Pas d'utilisateur"}
        </div>
        <div>
          <Button primary={true} color="secondary" variant="raised"
                  onClick={(event) => this.handleClickCreateProm(event)}>
            Créer la promo
          </Button>
        </div>

      </div>
    );
  }
}

export default PromsCreation;
