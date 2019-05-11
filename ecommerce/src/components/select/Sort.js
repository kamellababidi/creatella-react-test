import React from 'react';
import './Sort.css';
import Select from 'react-select';

const options = [
  { value: 'id', label: 'By Id' },
  { value: 'size', label: 'By Size' },
  { value: 'price', label: 'By Price' }
];

class Sort extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        seletedOption: null
    }
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.sortItems(selectedOption)
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className='sort-bar'>
        <span>Sort Options:</span>
        <br/>
        <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
        />
      </div>
    );
  }
}
export default Sort;
