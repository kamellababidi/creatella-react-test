import React from 'react';
import './Card.css';

class Card extends React.Component {
    
    render() {
      return (
        <div className='card'>
          <p className='face' role="image">| (• ◡•)|</p>
          <p className='price'>Price: $3.51</p>
          <p className='date'>3 days ago</p>
        </div>
      );
    }
  }
export default Card;
