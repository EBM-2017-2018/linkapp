import React, { Component } from 'react'
import SimpleTabs from './AccountTabs'

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
        <SimpleTabs/>
      </div>
    );
  }
}

export default AccountManagementPage;
