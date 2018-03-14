import React, { Component } from 'react'
import AccountManagement from './AccountManagement'
import AccountCreation from './AccountCreation'

class AccountManagementPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      displayedScreen: 'Account Management',
    }

    this.displayedScreenHandler = this.displayedScreenHandler.bind(this)
  }

  displayedScreenHandler (event, nameDisplayedScreen) {
    event.preventDefault();
    this.setState({displayedScreen: nameDisplayedScreen});
  }

  render () {
    return (
      <div>
        {this.state.displayedScreen === 'Account Management' && (
          <AccountManagement parentContext={this} displayedScreenHandler={this.displayedScreenHandler}/>)}
        {this.state.displayedScreen === 'Account Creation' && (
          <AccountCreation parentContext={this} />)
        }
      </div>
    );
  }
}

export default AccountManagementPage;