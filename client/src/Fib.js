import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  
  async fetchValues() {
    const values = await axios({
                  method: 'get',
                  headers: {
                    'content-type':'application-json'
                  },
                  url: 'http://localhost:5000/api/values/current',
                  responseType: 'json',
                  withCredentials: true,
                });

    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios({
                        method: 'get',
                        headers: {
                          'content-type':'application-json'
                        },
                        url: 'http://localhost:5000/api/values/all',
                        responseType: 'json',
                        withCredentials: true,
                      });
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('http://localhost:5000/api/values', {
      index: this.state.index,
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ');
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
       
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Enter your index:</label>
            <input
              value={this.state.index}
              onChange={(event) => this.setState({ index: event.target.value })}
            />
            <button>Submit</button>
          </form>

          <h3>Indexes I have seen:</h3>
          {this.renderSeenIndexes()}

          <h3>Calculated Values:</h3>
          {this.renderValues()}
        </div>
    );
  }
}

export default Fib;
