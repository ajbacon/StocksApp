import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Route exact path='/' component={Landing} />
      </Router>
    </div>
  );
}

export default App;
