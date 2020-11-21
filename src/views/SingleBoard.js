import React from 'react';
import pinsData from '../helpers/data/pinsData';
import boardsData from '../helpers/data/boardsData';

import AppModal from '../components/AppModal';
import BoardForm from '../components/Forms/BoardForm';
import PinCard from '../components/Cards/pinCard';

export default class SingleBoard extends React.Component {
  state = {
    board: {},
    pins: [],
  };

  componentDidMount() {
    // 1. Pull boardId from URL params
    const boardId = this.props.match.params.id;
    // 2. Make a call to the API that gets the board info
    boardsData.getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });

    // 3. Make a call to the API that returns the pins associated with this board and set to state.
    this.getPins(boardId)
      // because we did a promise.all, the response will not resolve until all the promises are completed
      .then((resp) => (
        this.setState({ pins: resp })
      ));
  }

  getBoardInfo = (boardId) => {
    boardsData.getSingleBoard(boardId).then((response) => {
      this.setState({
        board: response,
      });
    });
  }

  getPins = (boardId) => (
    pinsData.getBoardPins(boardId).then((response) => {
      // an array that holds all of the calls to get the pin information
      const pinArray = [];
      response.forEach((item) => {
        // pushing a function that returns a promise into the pinArray
        pinArray.push(pinsData.getPin(item.pinId));
      });
      // returning an array of all the fullfilled promises
      return Promise.all([...pinArray]);
    })
  )

  removePin = (e) => {
    const notRemovedPins = this.state.pins.filter(
      (pin) => pin.firebaseKey !== e.target.id,
    );
    this.setState({
      pins: notRemovedPins,
    });
    pinsData.deletePin(e.target.id).then(() => {
      this.getPins();
    });
  };

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      // 4. map over the pins in state
      pins.map((pin) => (
         <PinCard key={pin.firebaseKey} pin={pin} removePin={this.removePin}/>
      ))
    );

    // 5. Render the pins on the DOM
    return (
      <div>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'} >
          {Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
        </AppModal>
        <h1 className="mt-4">{board.name}</h1>
        <div className='d-flex justify-content-center flex-wrap container'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
