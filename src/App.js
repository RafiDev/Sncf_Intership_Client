import React, { Component } from 'react';
import Navbar from './NavBar'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css'
import Home from './Pages/Home'
import Rexmat from './Pages/Rexmat';
import Puma from './Pages/Puma';

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      windowWidth: 0,
      windowHeight: 0
    }
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  updateDimensions() {
    let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

    this.setState({ windowWidth, windowHeight });
  }

  render() {
    return (
      <Router>
          <Navbar />
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/rexmat' exact component={Rexmat} />
            <Route path='/puma' exact component={Puma} />
          </Switch>
      </Router>
    );
  }
}

export default App
