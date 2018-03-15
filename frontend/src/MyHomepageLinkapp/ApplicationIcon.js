import React, { Component } from 'react'

class ApplicationIcon extends Component {

  render () {
      var link = this.props.link;
      var srcImg = this.props.srcImg;
      var nameApp = this.props.nameApp;

      return(
      <a href={link} className="logoApplication">
        <img src={srcImg} className="application" id={nameApp} alt={nameApp}/>
        <h2 className= "nomApplication">{nameApp}</h2>
      </a>
    )
  }
}

export default ApplicationIcon;