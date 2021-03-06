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
import AccountModification from './AccountModification'
import { getAllUsers, getUserInfos } from '../Utils/ApiCall'

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
      optionComponent={ Option }
      noResultsText={<Typography>{'Aucun utilisateur trouvé'}</Typography>}
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


class AccountManagement extends Component {
  constructor (props) {
    super(props);

    this.onAccountModification = this.onAccountModification.bind(this);

    this.state = {
      nameAllUsers: [],
      single: null,
      token: cookie.load('token'),
      userToModify: null,

    }
  }

  handleChangeSingle = single =>{
    this.setState({
      single,
    });

    if( single !== null) {
      getUserInfos(this.state.token, single).then(userInfos => {
        this.setState({userToModify: userInfos});
        console.log(this.state.userToModify);
      }).catch(error => console.log(error));
    }
  };

  onAccountModification = (valuesToDisplay) => {
    console.log(valuesToDisplay);
    this.setState({nameAllUsers: valuesToDisplay});
  }

  componentDidMount() {
    // Retrieve all users names from database to put in Select
    getAllUsers(this.state.token).then(allUsers => {
      let valuesToDisplay = allUsers.map(receivedUsersInfo => ({
      value: receivedUsersInfo.username,
      label: receivedUsersInfo.prenom + ' ' + receivedUsersInfo.nom,
    }))
    this.setState({nameAllUsers: valuesToDisplay})
    }).catch(error => console.log(error));
  }

  render() {
    const { classes } = this.props;
    const { single } = this.state;

    return(<div>
        {((Array.isArray(this.state.nameAllUsers) && this.state.nameAllUsers.length)) ?
          <div className='root'>
            <Input
              fullWidth
              inputComponent={SelectWrapped}
              inputProps={{
                classes,
                value: single,
                onChange: this.handleChangeSingle,
                placeholder: 'Rechercher un utilisateur',
                instanceId: 'select-user',
                id: 'select-user',
                name: 'select-user',
                simpleValue: true,
                options: this.state.nameAllUsers,
              }}
            />
            {this.state.userToModify && <AccountModification
              refreshListHandler={this.onAccountModification}
              user={this.state.userToModify}/> }
          </div> :
          "No existing account available for now"
        }
      </div>
    )
  }
}

AccountManagement.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountManagement);
