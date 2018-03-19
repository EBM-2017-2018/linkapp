import React, { Component } from 'react'
import PromsCreation from './PromsCreation'
import PromsManagement from './PromsManagement'
import SimpleTabs from '../GenericComponents/SimpleTabs'
import PromsModification from './PromsModification'

class PromsManagementPage extends Component {
  constructor (props) {
    super(props);
    this.changePromDisplayedScreen = this.changePromDisplayedScreen.bind(this);

    this.state = {
      displayedScreen: 'Afficher les promos',
      nameTabs: ['Afficher les promos', 'Modifier une promo', 'Créer une promo']
    }

    this.displayedScreenHandler = this.displayedScreenHandler.bind(this)
  }

  displayedScreenHandler (event, nameDisplayedScreen) {
    event.preventDefault();
    this.setState({displayedScreen: nameDisplayedScreen});
  }

  changePromDisplayedScreen (numberTab) {
    this.setState({displayedScreen: this.state.nameTabs[numberTab]});
  }

  render () {
    return (
    <div>
      <div>
        <SimpleTabs nameTabs={this.state.nameTabs}
                    tabChangeHandler={this.changePromDisplayedScreen}/>
      </div>
      {this.state.displayedScreen === 'Afficher les promos' && (
        <PromsManagement parentContext={this} displayedScreenHandler={this.displayedScreenHandler}/>)}
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