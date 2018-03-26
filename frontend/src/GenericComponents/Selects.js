/* Defines SelectWraped component which is a searchable dropdown list
 * Option component is what handles the list of elements you want to display in the list.
  * An instance of Option has to be provided in the props of each SelectWrapped */

import React from 'react'
import Select from 'react-select'
import Typography from 'material-ui/Typography'
import { MenuItem } from 'material-ui/Menu'
import ArrowDropDownIcon from 'material-ui-icons/ArrowDropDown'
import CancelIcon from 'material-ui-icons/Cancel'
import ArrowDropUpIcon from 'material-ui-icons/ArrowDropUp'
import ClearIcon from 'material-ui-icons/Clear'
import Chip from 'material-ui/Chip'

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

export default Option;

export let SelectWrapped = (props) => {
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