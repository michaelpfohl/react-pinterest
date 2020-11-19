import React, { Component } from 'react';
import pinsData from '../../helpers/data/pinsData';
import PinCard from '../Cards/pinCard';

class Home extends Component {
  state = {
    pins: [],
  };

  componentDidMount() {
    this.getPublicPins();
  }

  getPublicPins = () => {
    pinsData.getAllPins().then((response) => {
      const publicPins = Object.values(response).filter((pin) => !pin.private);
      this.setState({ pins: publicPins });
    });
  };

  render() {
    const { pins } = this.state;
    const showPins = () => (
      pins.map((pin) => <PinCard key={pin.firebaseKey} pin={pin} />)
    );
    return (
      <div className="pin-container d-flex flex-wrap justify-content-center">
        {showPins()}
      </div>
    );
  }
}

export default Home;
