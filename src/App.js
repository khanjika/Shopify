import React, { Component } from 'react';
import './App.css';
import SearchBar from './Component/searchBar.jsx'
const axios = require('axios');

class App extends Component {
  render() {
    return (
      <div className="App">
        <span style={{ fontFamily: "Lucida Handwriting", fontSize: "2rem" }}> The Shoppies </span>
        <SearchBar />
      </div>
    );
  }
}

export default App;
