import React, { Component } from 'react';
import './App.css';
import SingleDocParse from './components/SingleDocParse';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <SingleDocParse />
      </div>
    );
  }
}

export default App;

