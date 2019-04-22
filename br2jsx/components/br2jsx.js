import React from 'react';
import PropTypes from 'prop-types';
import './br2jsx.css';

class BR2JSX extends React.Component {

  static propTypes = {
    text: PropTypes.string.isRequired
  };
  
  render() {
    let content = [];
    let strings = this.props.text.split(/<br>|<br\/>|<br\s\/>/gm);
    strings.forEach((str, index) => {
      content.push(str, <br key={index}/>);  
    });
    return (
      <div className="br2jsx">
        {content}
      </div>
    );
  }

}

export default BR2JSX;
