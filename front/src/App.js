import React from 'react';

const API = 'http://localhost:8080';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      pets: [],
      petInput: '',
      toyInput: '',
    }
  }
  componentDidMount() {
    fetch(`${API}/pets`)
      .then(response => response.json())
      .then(data => this.setState({ pets: data }));
  }

  handleDelete = (event, _id) => {
    event.preventDefault();
    fetch(`${API}/pets`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ _id }),
    }).then(response => response.json())
      .then(data => this.setState({ pets: data }));
  }

  handleAdd = (event) => {
    event.preventDefault();
    fetch(`${API}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: this.state.petInput, toy: this.state.toyInput }),
    })
      .then(response => response.json())
      .then(data => this.setState({ pets: data }
      ));

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <>
        <h1>Favorite Toys</h1>
        <ul>
          {this.state.pets.map((pet) => {
            return (
              <li key={pet._id}>
                <h3> {pet.name} - {pet.toy} </h3>
                <button onClick={(event) => this.handleDelete(event, pet._id)}>Delete</button>
              </li>
            )
          })}
        </ul>
        <form onSubmit={this.handleAdd}>
          Pet Name:
          <input
            name="petInput"
            value={this.state.petInput}
            onChange={this.handleChange}
          />
          Toy:
          <input
            name="toyInput"
            value={this.state.toyInput}
            onChange={this.handleChange}
          />
          <button type="submit">Add</button>

        </form>
      </>
    )
  }

}

export default App;
