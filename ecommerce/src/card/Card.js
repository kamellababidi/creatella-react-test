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

  dateFormater(itemDate) {
    var oneDay = 24*60*60*1000;
    var now = new Date();
    var itemDate = new Date(itemDate);
    var diffDays = Math.round(Math.abs((now.getTime() - itemDate.getTime())/(oneDay)));
    // handle hours case
    if (diffDays == 0)
      return Math.round(Math.abs((now.getTime() - itemDate.getTime())/(oneDay)) * 10) + " hours"
    // handle weeks case
    else if (diffDays / 7 >= 1)
      return Math.round(diffDays / 7) + " weeks"
    // handle days case
    else
      return diffDays + " days"
  }

  render() {
    return (
      <div className='card'>
        <p className='face' style={{fontSize: this.state.size}} role="image">{this.state.face}</p>
        <p className='price'>Price: ${this.state.price}</p>
        <p className='date'>{this.dateFormater(this.state.date)} ago</p>
      </div>
    );
  }
}
export default Card;
