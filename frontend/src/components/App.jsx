import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      title: '',
      todos: [],
    };
  }

  handleChange = (e) => {
    this.setState({
      'title': e.target.value
    });
  }

  render() {
    return (
      <div className="box">
        <form>
          <input onChange={this.handleChange} type="text" name="title" value={this.state.title}/>
        </form>
      </div>
    );
  }
}

export default App;
