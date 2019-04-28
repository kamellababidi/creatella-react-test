import React from 'react';
import './Card.css';

class Card extends React.Component {

  constructor(props) {
    super(props)
    let item = this.props.item
    this.state = {
      id: item.id,
      size: item.size,
      price: item.price,
      face: item.face,
      date: item.date
    }
  }

  render() {
    return (
      <div className='card'>
        <p className='face' role="image">{this.state.face}</p>
        <p className='price'>Price: ${this.state.price}</p>
        <p className='date'>3 days ago</p>
      </div>
    );
  }
}
export default Card;
