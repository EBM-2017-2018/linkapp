import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Select from 'react-select'
import Typography from 'material-ui/Typography'
import Input from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown'
import CancelIcon from 'material-ui-icons/Cancel'
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp'
import ClearIcon from 'material-ui-icons/Clear'
import Chip from 'material-ui/Chip'
import cookie from 'react-cookies'
import TablesSelectStudents from './TablesSelectStudents'
import {
  getAllUsers, getPromosInfos, updatePromoInfos, getAllPromos,
  getBasicUserInfos
} from '../UsefulFuncVar/ApiCall'
import { Button } from 'material-ui'

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props;

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    );
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props;

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'No results found'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
      }}
      clearRenderer={() => <ClearIcon />}
      valueComponent={valueProps => {
        const { value, children, onRemove } = valueProps;

        const onDelete = event => {
          event.preventDefault();
          event.stopPropagation();
          onRemove(value);
        };

        if (onRemove) {
          return (
            <Chip
              tabIndex={-1}
              label={children}
              className={classes.chip}
              deleteIcon={<CancelIcon onTouchEnd={onDelete} />}
              onDelete={onDelete}
            />
          );
        }

        return <div className="Select-value">{children}</div>;
      }}
      {...other}
    />
  );
}

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


class PromsModification extends Component {
  constructor (props) {
    super(props);

    this.dataTableUpdater = this.dataTableUpdater.bind(this);

    this.state = {
      nameProms: [],
      infosPossibleRespos: [],
      single: null,
      token: cookie.load('token'),
      nameSelectedProm: '',
      respoSelectedProm: '',
      dataForTableOne: [],
      dataForTableTwo: [],
      promSelected: false,
      nomEtPrenomRespo: '',
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

  // When value of selected prom changes
  handleChangeSingle = single => {
    this.setState({
      single,
    });

    if (single !== null) {
      // Api call to get selected prom infos
      getPromosInfos(single, this.state.token)
        .then(dataProm => {
          getAllUsers(this.state.token).then(allUsers => {

            // Work to fill table of members and non-members table of selected prom
            let usernamesMemberProm = dataProm.membres;
            let tableAllUsers = allUsers;
            let dataForTableTwo = [];

            for (let i = 0; i < usernamesMemberProm.length; i++) {
              let userInfo = tableAllUsers.filter(user => user.username === usernamesMemberProm[i]);
              dataForTableTwo.push(userInfo[0]);
            }

            let dataForTableOne = allUsers.filter(user => !dataForTableTwo.includes(user));

            getBasicUserInfos(this.state.token, dataProm.responsable)
              .then(respoInfo => {
                this.setState({
                  nameSelectedProm: dataProm.nomPromo,
                  promSelected: true,
                  dataForTableOne: dataForTableOne,
                  dataForTableTwo: dataForTableTwo,
                  respoSelectedProm: dataProm.responsable,
                  nomEtPrenomRespo: respoInfo.prenom + " " + respoInfo.nom,
                });
              }).catch(error => console.log(error));
          }).catch(error => console.log(error));
        }).catch(error => console.log(error))
    }

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

  componentDidMount() {
    getAllPromos(this.state.token).then((allPromos) => {
      let valuesToDisplay = allPromos.map(prom => ({
        value: prom.nomPromo,
        label: prom.nomPromo,
      }));
      getAllUsers(this.state.token).then(allUsers => {
        let possibleRespos = allUsers.filter(user => user.role==='intervenant' || user.role==='administrateur')
          .map(user => ({
            value: user.username,
            label: user.prenom + " " + user.nom,
          }));
        this.setState({nameProms: valuesToDisplay, infosPossibleRespos: possibleRespos});
      })
        .catch(error => console.log(error));
    })
      .catch(error => console.log(error));
  }


  render() {
    const { classes } = this.props;
    const { single } = this.state;

    return(<div>
        {((Array.isArray(this.state.nameProms) && this.state.nameProms.length)) ?
          <div className='root'>
            <Input
              fullWidth
              inputComponent={SelectWrapped}
              inputProps={{
                classes,
                value: single,
                onChange: this.handleChangeSingle,
                placeholder: 'Rechercher une promo',
                instanceId: 'select-promo',
                id: 'select-promo',
                name: 'select-promo',
                simpleValue: true,
                options: this.state.nameProms,
              }}
            />
          </div> :
          "No existing prom available for now"
        }
        { this.state.promSelected && (
      <div className='selectedPromInfo'>
        <h2>Nom de la promo : {this.state.nameSelectedProm}</h2>
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
        <div className='blocMembersProm'>
          {!(this.state.dataForTableOne === undefined || this.state.dataForTableOne.length === 0) ?
            <TablesSelectStudents dataForTableOne={this.state.dataForTableOne}
            dataForTableTwo={this.state.dataForTableTwo}
            dataTableUpdater={this.dataTableUpdater}/>
            : "Pas d'appartenant à la promo"}
        </div>
        <div>
          <Button primary={true} color="secondary" variant="raised"
                  onClick={(event) => this.handleClickUpdateProm(event)}>
            Mettre à jour la promo
          </Button>
        </div>
      </div>
        )}
      </div>
    )
  }

  // Send new prom data to database
  handleClickUpdateProm (event) {
    let membersUsernames = this.state.dataForTableTwo.map(el => el.username)
    let respoUsername = this.state.infosPossibleRespos.filter(el => el.label===this.state.nomEtPrenomRespo)[0].value;

    console.log('responsable ?');
    console.log(respoUsername);
    updatePromoInfos(this.state.token,
      this.state.nameSelectedProm,
      respoUsername,
      membersUsernames);
  }
}

PromsModification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PromsModification);