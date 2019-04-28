import React from 'react';
import Card from './card/Card.js'
import Spinner from './ui/Spinner.js'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    // initial states
    this.state = {
      items: [],
      loader: true
    }
  }

  componentDidMount() {
    // fetch product from server
    fetch("http://localhost:3000/api/products")
      .then(response => response.json())
      .then(data => this.setState({items: data, loader: false}))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className="App">
        {
          this.state.items &&
          this.state.loader ?
          <div className='loader'>
            <Spinner/>
          </div>
          :
          this.state.items.map (item => (
            <Card
              item = {item}
            />
          ))
        }  
      </div>
    )
  }
}

export default App;
