/* Account management main component that defines its structure and deals with view changing */
import React, { Component } from 'react'
import AccountManagement from './AccountManagement'
import AccountCreation from './AccountCreation'
import SimpleTabs from '../GenericComponents/SimpleTabs'

class AccountManagementPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      displayedScreen: 'Modifier un compte',
      nameTabs: ['Modifier un compte', 'Créer un compte'],
    }

    this.changeAccountDisplayedScreen = this.changeAccountDisplayedScreen.bind(this)
  }

  /* Initiate the displayed screen change
  * numberTabs : tab number corresponding to the screen that needs to be displayed */
  changeAccountDisplayedScreen = (numberTab) => {
    this.setState({displayedScreen: this.state.nameTabs[numberTab]});
  }

  render () {
    return (
      <div>
        <div>
          <SimpleTabs nameTabs={this.state.nameTabs}
                      onRef={ref => (this.refTabs = ref)}
                      tabChangeHandler={this.changeAccountDisplayedScreen}/>
        </div>
        <div>
          {this.state.displayedScreen === 'Modifier un compte' && (
          <div>
            <AccountManagement/>
          </div>)}
          {this.state.displayedScreen === 'Créer un compte' && (
            <div>
            <AccountCreation/>
          </div>)}
        </div>
      </div>
    );
  }
}

export default AccountManagementPage;
