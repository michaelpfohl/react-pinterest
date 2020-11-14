import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import googleImage from './Sign-in-with-Google.png';

class Auth extends Component {
  state = {};

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
    <div className="auth">
      <button className="btn btn-secondary" onClick={this.loginClickEvent}>
        <img src={googleImage} alt="Google Sign In Button"></img>
      </button>
    </div>
    );
  }
}

export default Auth;
