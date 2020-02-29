import React from 'react';
import Recalc from './components/Recalc';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <Recalc></Recalc>
      </div>
    );
  }
}

export default App;
