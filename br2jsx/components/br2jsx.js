import React from 'react';
import PropTypes from 'prop-types';
import './br2jsx.css';

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  };
  
  render() {
    let strings = this.props.text.split(/<br>|<br\/>|<br\s\/>/gm);
    
    strings = strings.map((item, index, array) => {
      if (index !== array.length-1) 
        return [item, <br key={index}/>];
      else
        return item;
    });
    return (
      <div className="br2jsx">
        {strings}
      </div>
    );
  }

}

export default BR2JSX;
