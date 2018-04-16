import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

import { Movie } from './Movie/Movie';
import { Login } from './Login/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact={true} path="/" component={Login}/>
          <Route exact={true} path="/home" render={() => 
          {
            return (localStorage.getItem('auth') == 'authenticated')?(<Movie/>) : (<div>invalid user</div>)
          }
        }/>
        </div>
      </Router>
    );
  }
}

export default App;
