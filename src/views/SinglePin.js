import React, { Component } from 'react';
import pinsData from '../helpers/data/pinsData';
import authData from '../helpers/data/authData';

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
      const user = authData.getUid();
      this.setState({
        pin: response,
        user,
      });
    });
  }

  removePin = (e) => {
    pinsData.deletePin(e.target.id).then(() => {
      this.props.history.goBack();
    });
  };

  render() {
    const { pin, user } = this.state;
    return (
        <div className="d-flex justify-content-center">
          <div className="single-pin-container">
            <h1 className="single-pin-header">{pin.name}</h1>
            <img alt={pin.name} src={pin.imageUrl} className="single-pin-image"/>
            <p>{pin.description}</p>
            { (user === pin.userId) && (
              <div>
              <AppModal title={'Update Pin'} buttonLabel={'Update Pin'}>
                {Object.keys(pin).length && <PinForm pin={pin} onUpdate={this.getPinInfo} />}
              </AppModal>
              <button className="btn btn-danger"id={pin.firebaseKey} onClick={(e) => this.removePin(e)} href="/">Delete</button>
              </div>
            )
            }
          </div>
        </div>
    );
  }
}

export default SinglePin;