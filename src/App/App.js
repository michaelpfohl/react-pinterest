import React from 'react';
import './App.scss';
import firebase from 'firebase/app';
import { BrowserRouter as Router } from 'react-router-dom';
import fbConnection from '../helpers/data/connection';

import Navbar from '../components/Navbar';
import Routes from '../helpers/Routes';

fbConnection();

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;

    return (
      <div className="App">
        <Router>
          <Navbar authed={authed}/>
          <Routes authed={authed}/>
        </Router>
      </div>
    );
  }
}

export default App;
