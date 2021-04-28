import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css'
import Rexmat from './Pages/Rexmat';
import Puma from './Pages/Puma';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/rexmat">Rexmat</Link>
            </li>
            <li>
              <Link to="/puma">Puma</Link>
            </li>
          </ul>

          <hr />

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/rexmat">
              <Rexmat />
            </Route>
            <Route path="/puma">
              <Puma />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
      <br/>
      <p>Soon</p>
    </div>
  );
}

export default App
