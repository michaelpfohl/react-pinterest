import React, { Component } from 'react';
import boardsPinsData from '../helpers/data/boardsPinsData';
import PinCard from '../components/Cards/pinCard';

class SingleBoard extends Component {
    state = { pins: [] }

    render() {
      const { pins } = this.state;
      const boardFirebaseKey = this.props.match.params.id;
      boardsPinsData.getBoardsPins(boardFirebaseKey).then((response) => {
        this.setState({
          pins: response,
        });
      });
      const renderPinsToDom = () => pins.map((pin) => <PinCard pin={pin} key={pin.firebaseKey}/>);
      return (
        <div className="pin-container d-flex flex-wrap justify-content-center">
          {renderPinsToDom()}
        </div>
      );
    }
}

export default SingleBoard;
