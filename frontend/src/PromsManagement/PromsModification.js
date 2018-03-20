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
import axios from 'axios/index'
import cookie from 'react-cookies'
import GlobalVarHandler from '../UsefulFuncVar/UsefulFuncVar'
import TablesSelectStudents from './TablesSelectStudents'
import { getAllUsers, getPromosInfos } from '../UsefulFuncVar/ApiCall'

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
      single: null,
      token: cookie.load('token'),
      nameSelectedProm: '',
      respoSelectedProm: '',
      dataForTableOne: [],
      dataForTableTwo: [],
      promSelected: false,
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

      console.log("dataForTableOne in PromModif");
      console.log(dataForTableOne);
      console.log(dataForTableTwo);

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

    // Api call to get data of members of prom and remove members of prom from allUsers to get people who don't
    // belong to the prom
    getPromosInfos(single, this.state.token)
      .then(dataProm => {
        getAllUsers(this.state.token).then(allUsers => {
          let usernamesMemberProm = dataProm.membres;
          let tableAllUsers = allUsers;
          let dataForTableTwo = [];

          for (let i=0; i<usernamesMemberProm.length; i++) {
            let userInfo = tableAllUsers.filter(user => user.username===usernamesMemberProm[i]);
            dataForTableTwo.push(userInfo[0]);
          }

          let dataForTableOne = allUsers.filter(user => !dataForTableTwo.includes(user));

          this.setState({
            nameSelectedProm: dataProm.nomPromo,
            promSelected: true,
            dataForTableOne: dataForTableOne,
            dataForTableTwo: dataForTableTwo
          });

        }).catch(error => console.log(error));
      }).catch(error => console.log(error))

  };


  componentDidMount() {
    let apiBaseUrl = GlobalVarHandler.apiBaseUrl;
    let getAllPromosUrl = GlobalVarHandler.getAllPromosUrl;
    axios.get(apiBaseUrl + getAllPromosUrl, {
      headers: {'Authorization': this.state.token}
    }).then(response => {
      let valuesToDisplay = response.data.promotions.map(receivedPromInfo => ({
        value: receivedPromInfo.nomPromo,
        label: receivedPromInfo.nomPromo,
      }));

      this.setState({nameProms: valuesToDisplay})
    });
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
        <Typography>{this.state.nomPromo}</Typography>
        <Typography>{this.state.responsable}</Typography>
        <div className='blocMembersProm'>
          {!(this.state.dataForTableOne === undefined || this.state.dataForTableOne.length === 0) ?
            <TablesSelectStudents dataForTableOne={this.state.dataForTableOne}
            dataForTableTwo={this.state.dataForTableTwo}
            dataTableUpdater={this.dataTableUpdater}/>
            : "Pas d'appartenant à la promo"}
        </div>
      </div>
        )}
      </div>
    )
  }

}

PromsModification.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PromsModification);