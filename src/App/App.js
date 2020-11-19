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
    user: null,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } else {
        this.setState({ user: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { user } = this.state;

    return (
      <div className="App">
        <Router>
          <Navbar user={user}>
            <Routes user={user}/>
          </Navbar>
        </Router>
      </div>
    );
  }
}

export default App;
