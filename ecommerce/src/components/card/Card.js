import React from 'react';
import './Card.css';
import {dateFormater} from './../../helpers/date'

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
        <p className='face' style={{fontSize: this.state.size}} role="image">{this.state.face}</p>
        <p className='price'>Price: ${this.state.price}</p>
        <p className='date'>{dateFormater(this.state.date)} ago</p>
      </div>
    );
  }
}
export default Card;
