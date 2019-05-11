import React from 'react';
import Card from './components/card/Card.js'
import Spinner from './ui/Spinner.js'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    // initial states
    this.state = {
      items: [],
      loader: true,
      loadMore: false,
      page: 1
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    this.fetchData()
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }
  
  trackScrolling = () => {
    const wrappedElement = document.getElementById('root');
    if (this.isBottom(wrappedElement)) {
      this.setState({
        loadMore: true,
        page: this.state.page + 1
      })
      this.fetchData()
    }
  };

  fetchData() {
    // fetch product from server
    fetch(`http://localhost:3000/api/products?_page=${this.state.page}`)
    .then(response => response.json())
    .then(data => {
      let items = this.state.items
      if (data.length === 0) {
        document.removeEventListener('scroll', this.trackScrolling);
      } else {
        if (items.length !== 0 && items.length % 20 === 0) {
          let list = document.getElementsByClassName('Container')[0]
          var tag = '<img class="loader" src="http://localhost:3000/ads/?r=' + Math.floor(Math.random()*1000) + '"/>';
          var doc = new DOMParser().parseFromString(tag, "text/html")
          list.append(doc.body.children[0])
        }
        this.setState({items: items.concat(data), loader: false, loadMore: false})
      }
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div className='App'>
        <div className="Container">
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
        {
          this.state.loadMore ?
          <div className='loader'>
            <Spinner/>
          </div>
          :
          <div className="loader">
            --------------------------  End Of Catalogue  --------------------------
          </div>
        }
        
      </div>
    )
  }
}

export default App;
