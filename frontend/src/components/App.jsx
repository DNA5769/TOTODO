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
      title: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8000/api/create-task/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: this.state.title })
    }).then(response => response.json()).then(data => this.setState(state => {
      return {
        title: '',
        todos: [...state.todos, data],
      };
    }));
  }

  handleDelete = id => {
    fetch(`http://localhost:8000/api/delete-task/${id}/`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => this.componentDidMount());
  }

  render() {
    var self = this;
    return (
      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} type="text" name="title" value={this.state.title}/>
        </form>
        {this.state.todos.map(function(todo) {
          return (
            <div>
              <h1>{todo.title}</h1>
              <button onClick={() => self.handleDelete(todo.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
