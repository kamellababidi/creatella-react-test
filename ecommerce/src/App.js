import React from 'react';
import Card from './components/card/Card.js'
import Spinner from './ui/Spinner.js'
import './App.css';
import {randomNumberExcept} from './helpers/random'
import Sort from './components/select/Sort'

class App extends React.Component {
  constructor(props) {
    super(props)
    // initial states
    this.state = {
      items: [],
      loader: true,
      loadMore: false,
      page: 1,
      addsNumbers: [],
      sort: false,
      selectedOption: null
    }
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    if (this.state.loader)
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
    fetch(`http://localhost:3000/api/products?_page=${this.state.page}&_sort=${this.state.selectedOption}`)
    .then(response => response.json())
    .then(data => {
      let items = this.state.items
      if (data.length === 0) { // end of catalog
        document.removeEventListener('scroll', this.trackScrolling);
      } else {
        // check after 20 item to append add 
        if (items.length !== 0 && items.length % 20 === 0) {
          // getting unique random number fo add
          let random = randomNumberExcept(this.state.addsNumbers)
          this.setState({
            addsNumbers: this.state.addsNumbers.concat(random)
          })
          // append add to list
          let list = document.getElementsByClassName('Container')[0]
          var tag = '<img class="add-img" src="http://localhost:3000/ads/?r=' + random + '"/>';
          var doc = new DOMParser().parseFromString(tag, "text/html")
          list.append(doc.body.children[0])
        }
        this.setState({items: items.concat(data), loader: false, loadMore: false})
      }
    })
    .catch(error => console.log(error));
  }

  // sort items
  sortItems(option) {
    this.setState({
      items: [],
      page: 1,
      sort: true,
      loader: true,
      addsNumbers: [],
      selectedOption: option.value
    }, () => this.fetchData() )
    this.removeAdds()
  }

  // remove adds from DOM
  removeAdds(){
    let adds = document.getElementsByClassName('add-img')
    for (var i = 0; i < adds.length; i++ ) {
      adds[i].remove()
    }
  }

  render() {
    return (
      <div className='App'>
        <Sort
          sortItems={this.sortItems.bind(this)}
        />
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
