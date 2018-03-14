import React, { Component } from 'react'
import PromsCreation from './PromsCreation'
import PromsManagement from './PromsManagement'

class PromsManagementPage extends Component {
  constructor (props) {
    super(props);

    this.state = {
      displayedScreen: 'Proms Management',
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
      {this.state.displayedScreen === 'Proms Management' && (
        <PromsManagement parentContext={this} displayedScreenHandler={this.displayedScreenHandler}/>)}
      {this.state.displayedScreen === 'Proms Creation' && (
        <PromsCreation parentContext={this} />)
      }
    </div>
    );
  }
}

export default PromsManagementPage;