import React, { Component } from 'react';
import pinsData from '../../helpers/data/pinsData';
import PublicPinCard from '../Cards/publicPinCard';

class Home extends Component {
  state = {
    pins: [],
  };

  componentDidMount() {
    this.getPublicPins();
  }

  getPublicPins = () => {
    pinsData.getAllPins().then((response) => {
      if (response) {
        const publicPins = response.filter((pin) => pin.private === 'Public');
        this.setState({ pins: publicPins });
      }
    });
  };

  render() {
    const { pins } = this.state;
    const showPins = () => (
      pins.map((pin) => <PublicPinCard key={pin.firebaseKey} pin={pin}/>)
    );
    return (
      <div className="pin-container d-flex flex-wrap justify-content-center">
        {showPins()}
      </div>
    );
  }
}

export default Home;
