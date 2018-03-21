import React, { Component } from 'react'
import '../Style/PromsCreation.css'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import cookie from 'react-cookies'
import TablesSelectStudents from './TablesSelectStudents'
import { ToastContainer } from 'react-toastify'
import { getAllUsers, setPromosInfos } from '../UsefulFuncVar/ApiCall'
import { Input, withStyles } from 'material-ui'
import { SelectWrapped } from '../GenericComponents/Selects'

const ITEM_HEIGHT = 48;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },

  '@global': {
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.42,
      color: theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
});


class PromsCreation extends Component {
  constructor(props){
    super(props);

    this.dataTableUpdater = this.dataTableUpdater.bind(this);

    this.state = {
      token: cookie.load('token'),
      nomPromo:'',
      responsable:'',
      dataForTableOne: [],
      dataForTableTwo: [],
      nomEtPrenomRespo: "Responsable de l'option",
      infosPossibleRespos: [],
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

  handleChangeSingleRespo = (respo) => {
    this.setState({
      respo,
    });

    if (respo !== null) {
      let nomEtPrenomRespo = this.state.infosPossibleRespos.filter(el => el.value===respo)[0].label;
      this.setState({nomEtPrenomRespo: nomEtPrenomRespo});
    }
  }

  // Api call to create prom
  handleClickCreateProm (event) {
    let membersUsernames = this.state.dataForTableTwo.map(el => el.username);
    let respoUsername = this.state.infosPossibleRespos.filter(el => el.label===this.state.nomEtPrenomRespo)[0].value;
    setPromosInfos(this.state.nomPromo, respoUsername, this.state.token, membersUsernames);
  }

  componentDidMount () {
    getAllUsers(this.state.token).then((allUsers) => {
      let possibleRespos = allUsers.filter(user => user.role==='intervenant' || user.role==='administrateur')
        .map(user => ({
          value: user.username,
          label: user.prenom + " " + user.nom,
        }));

      this.setState({dataForTableOne: allUsers, infosPossibleRespos: possibleRespos});

    });
    // TODO : Utiliser des requêtes definies dans api call pour mettre les bons users dans les tables
  }

  render() {
    const { classes } = this.props;
    const { single } = this.state;

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
          </form>
          <h2>Nom du responsable : </h2>
          <Input
            fullWidth
            inputComponent={SelectWrapped}
            inputProps={{
              classes,
              value: single,
              onChange: this.handleChangeSingleRespo,
              placeholder: this.state.nomEtPrenomRespo,
              instanceId: 'select-respo',
              id: 'select-respo',
              name: 'select-respo',
              simpleValue: true,
              options: this.state.infosPossibleRespos,
            }}
          />
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

export default withStyles(styles)(PromsCreation);
