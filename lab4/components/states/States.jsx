import React from 'react';
import './States.css';

/**
 * Define States, a React componment of CS142 project #4 problem #2.  The model
 * data for this view (the state names) is available
 * at window.cs142models.statesModel().
 */

class States extends React.Component {
  constructor(props) {
    super(props);
    console.log('window.cs142models.statesModel()', window.cs142models.statesModel());
    this.state = {
      array: window.cs142models.statesModel(),
      inputValue: "",
      flag: true,
    }
    this.handleChanger = (event) => this.handleChange(event);
  }
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
    for (let i = 0; i < this.state.array.length; i++) {
      if (this.state.array[i].toUpperCase().includes(this.state.inputValue.toUpperCase())) {
        this.state.flag = true;
        break;
      } 
      else {
        this.state.flag = false;
      }
    }
  }

  render() {
    return (
      <div className = "container">
        <div className="app">
          <input
            id = "InputID"
            type = "text"
            placeholder = "Search"
            onChange = {this.handleChanger}
            required
          />
        </div>
        <div className = "States">
            {this.state.array.map((element) => element.toUpperCase().includes(this.state.inputValue.toUpperCase()) ? (<div>{element}</div>) : (""))}
            {!this.state.flag ? "Not Found." : " "}
          </div>
      </div>
    );
  }
}

export default States;
