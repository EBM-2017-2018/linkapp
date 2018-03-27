/* PromsManagement is the component that handles the switch between each possible screen of PromsManagement folder */

import React, { Component } from 'react'
import PromsCreation from './PromsCreation'
import SimpleTabs from '../GenericComponents/SimpleTabs'
import PromsModification from './PromsModification'

class PromsManagementPage extends Component {
  constructor (props) {
    super(props);
    this.changePromDisplayedScreen = this.changePromDisplayedScreen.bind(this);

    this.state = {
      displayedScreen: 'Modifier une promo',
      nameTabs: ['Modifier une promo', 'Créer une promo']
    }

    this.displayedScreenHandler = this.displayedScreenHandler.bind(this)
  }

  /* Passes to the tab component the index of the tab that needs to be displayed */
  displayedScreenHandler = (event, nameDisplayedScreen) => {
    let numberTab = this.state.nameTabs.indexOf(nameDisplayedScreen);
    this.changePromDisplayedScreen(numberTab);
    this.refTabs.handleChange(event, numberTab);
  }

  /* Changes screen by updating state */
  changePromDisplayedScreen = (numberTab) => {
    this.setState({displayedScreen: this.state.nameTabs[numberTab]});
  }

  render () {
    return (
    <div>
      <div>
        <SimpleTabs nameTabs={this.state.nameTabs}
                    onRef={ref => (this.refTabs = ref)}
                    tabChangeHandler={this.changePromDisplayedScreen}/>
      </div>
        {this.state.displayedScreen === 'Modifier une promo' && (
        <PromsModification parentContext={this} displayedScreenHandler={this.displayedScreenHandler}/>)}
      {this.state.displayedScreen === 'Créer une promo' && (
        <PromsCreation parentContext={this} />)
      }
    </div>
    );
  }
}

export default PromsManagementPage;