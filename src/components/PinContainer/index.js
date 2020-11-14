import React, { Component } from 'react';
import pinsData from '../../helpers/data/pinsData';
import PinCard from '../Cards/pinCard';

class PinContainer extends Component {
  state = { pins: [] };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    pinsData.getPins().then((response) => {
      this.setState({
        pins: response,
      });
    });
  }

  render() {
    const { pins } = this.state;
    const renderPinsToDom = () => pins.map((pin) => <PinCard pin={pin} key={pin.firebaseKey}/>);
    return (
      <div className="pin-container d-flex flex-wrap justify-content-center">
        {renderPinsToDom()}
      </div>
    );
  }
}

export default PinContainer;
