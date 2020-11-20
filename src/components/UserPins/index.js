import React, { Component } from 'react';
import PinCard from '../Cards/pinCard';

class UserPins extends Component {
  render() {
    const { pins } = this.props;
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
