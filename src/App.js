import React, { Component } from 'react';
import './App.css';
import ParseInput from './components/ParseInput';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <ParseInput/>
      </div>
    );
  }
}

export default App;

