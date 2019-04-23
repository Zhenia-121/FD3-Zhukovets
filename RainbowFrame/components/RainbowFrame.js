import React from 'react';
import PropTypes from 'prop-types';
import './RainbowFrame.css';

class RainbowFrame extends React.Component {

  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string).isRequired
  };
  
  render() {
    let frames = <p>{this.props.children}</p>;
    let Width = "250px";
    let Height = "150px";
    let stepWH = "10px";
    console.log(this.props.colors);
    this.props.colors.forEach(color => {
      frames = <div style={{border:"solid 8px "+color,margin:"10px",height:Height,width:Width}}>{frames}</div>
      Width += stepWH;
      Height += stepWH;
    });
    return (
      <div className="rainbowFrame">
        {frames}
      </div>
    );
  }

}

export default RainbowFrame;
