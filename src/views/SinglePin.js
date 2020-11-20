import React, { Component } from 'react';
import pinsData from '../helpers/data/pinsData';

import AppModal from '../components/AppModal';
import PinForm from '../components/Forms/PinForm';

class SinglePin extends Component {
  state = {
    pin: {},
  };

  componentDidMount() {
    this.getPinInfo();
  }

  getPinInfo = () => {
    const pinId = this.props.match.params.id;
    pinsData.getPin(pinId).then((response) => {
      this.setState({
        pin: response,
      });
    });
  }

  render() {
    const { pin } = this.state;
    return (
        <div className="d-flex justify-content-center">
          <div className="single-pin-container">
            <h1 className="single-pin-header">{pin.name}</h1>
            <img alt={pin.name} src={pin.imageUrl} className="single-pin-image"/>
            <p>{pin.description}</p>
            <AppModal title={'Update Pin'} buttonLabel={'Update Pin'} >
              {Object.keys(pin).length && <PinForm pin={pin} onUpdate={this.getPinInfo} />}
            </AppModal>
          </div>
        </div>
    );
  }
}

export default SinglePin;
