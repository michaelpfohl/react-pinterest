import React, { Component } from 'react';
import authData from '../helpers/data/authData';
import pinsData from '../helpers/data/pinsData';

import AppModal from '../components/AppModal';
import PinForm from '../components/Forms/PinForm';
import PinCard from '../components/Cards/pinCard';
import Loader from '../components/Loader';

class Pins extends Component {
  state = {
    pins: [],
    loading: true,
  };

  componentDidMount() {
    this.getUserPins();
  }

  getUserPins = () => {
    const user = authData.getUid();
    pinsData.getAllPins().then((response) => {
      const userPins = Object.values(response).filter(
        (pin) => pin.userId === user,
      );
      this.setState({
        pins: userPins,
      }, this.setLoading);
    });
  };

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  removePin = (e) => {
    const notRemovedPins = this.state.pins.filter(
      (pin) => pin.firebaseKey !== e.target.id,
    );
    this.setState({
      pins: notRemovedPins,
    });
    pinsData.deletePin(e.target.id).then(() => {
      this.getUserPins();
    });
  };

  render() {
    const { pins, loading } = this.state;
    const showUserPins = () => (
      pins.map((pin) => <PinCard key={pin.firebaseKey} pin={pin} removePin={this.removePin}/>)
    );
    return (
      <>
      { loading ? (
          <Loader />
      ) : (
        <>
        <AppModal title={'Create Pin'} buttonLabel={'Create Pin'}>
          <PinForm onUpdate={this.getUserPins} />
        </AppModal>
        <div>
          <h1 className="mt-4">Your Created Pins</h1>
          <div className="pin-container d-flex flex-wrap justify-content-center">
            {showUserPins()}
          </div>
        </div>
        </>
      )}
      </>
    );
  }
}

export default Pins;
