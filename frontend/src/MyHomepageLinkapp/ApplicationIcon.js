import React, { Component } from 'react'

class ApplicationIcon extends Component {

  render () {
      const link = this.props.link;
      const srcImg = this.props.srcImg;
      const nameApp = this.props.nameApp;

      return(
      <a href={link} className="logoApplication">
        <img src={srcImg} style={{
         height: 100,
          width: 120,
        }} className="application"  id={nameApp} alt={nameApp}/>
        <h2 className= "nomApplication">{nameApp}</h2>
      </a>
    )
  }
}

export default ApplicationIcon;
