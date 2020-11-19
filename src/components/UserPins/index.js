import React, { Component } from 'react';
import pinsData from '../../helpers/data/pinsData';
import PinCard from '../Cards/pinCard';
import authData from '../../helpers/data/authData';

class UserPins extends Component {
  state = { pins: [] };

  componentDidMount() {
    this.getUserPins();
  }

  getUserPins = () => {
    const user = authData.getUid();
    pinsData.getAllPins().then((response) => {
      const userPins = Object.values(response).filter((pin) => pin.userId === user);
      this.setState({
        pins: userPins,
      });
    });
  }

  render() {
    const { pins } = this.state;
    const renderPinsToDom = () => pins.map((pin) => <PinCard pin={pin} key={pin.firebaseKey}/>);
    return (
      <div>
        <h1 className="mt-4">Your Created Pins</h1>
        <div className="pin-container d-flex flex-wrap justify-content-center">
          {renderPinsToDom()}
        </div>
      </div>
    );
  }
}

export default UserPins;
