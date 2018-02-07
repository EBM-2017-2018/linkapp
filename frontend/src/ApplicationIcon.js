import React, { Component } from 'react';

class ApplicationIcon extends Component {

  render () {
      var link = this.props.link;
      var srcImg = this.props.srcImg;
      var nameApp = this.props.nameApp;

      return(
      <a href={link}>
        <img src={srcImg} className="application" id={nameApp} alt={nameApp}/>
        <div>{nameApp}</div>
      </a>
    )
  }
}

export default ApplicationIcon;