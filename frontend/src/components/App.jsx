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

  componentDidMount()
  {
    fetch('http://localhost:8000/api/read-tasks/')
      .then(response => response.json())
      .then(data => this.setState({ todos: data }))
      .catch(e => console.log(e));
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
        {this.state.todos.map(function(todo) {
          return (
            <h1>{todo.title}</h1>
          );
        })}
      </div>
    );
  }
}

export default App;
