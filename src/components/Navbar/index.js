import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Link } from 'react-router-dom';
import SearchInput from '../SearchInput';

class Navbar extends Component {
  state = {};

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { user } = this.props;

    return (
      <>
      <div className="nav-container">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <span className="navbar-brand" href="#">
            <Link to='/' className="navbar-logo">Pinterest</Link>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item nav-link">
                <Link to='/boards' className="navbar-options">Boards</Link>
              </li>
              <li className="nav-item nav-link">
                <Link to='/pins' className="navbar-options">Pins</Link>
              </li>
            </ul>
            <SearchInput />
            <div className="form-inline my-2 my-lg-0">
              {user && (
                <button
                  className="nav-link btn btn-danger"
                  onClick={this.logMeOut}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {this.props.children}
      <footer className="footer">© 2020 - Michael Pfohl</footer>
      </>
    );
  }
}

export default Navbar;
