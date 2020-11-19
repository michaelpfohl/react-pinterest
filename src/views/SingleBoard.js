// import React, { Component } from 'react';
// import boardsPinsData from '../helpers/data/boardsPinsData';
// import PinCard from '../components/Cards/pinCard';
// import BoardForm from '../components/Forms/BoardForm';
// import boardsData from '../helpers/data/boardsData';
// import AppModal from '../components/AppModal';

// class SingleBoard extends Component {
//   state = {
//     pins: [],
//     board: {},
//   };

//   // componentDidMount() {
//   //   this.getBoardInfo(this.props.match.params.id);
//   // }

//   // getBoardInfo = (boardObj) => {
//   //   boardsData.getSingleBoard(boardObj).then((response) => {
//   //     this.setState({ board: response.data });
//   //   });
//   // };

//   render() {
//     const { pins, board } = this.state;
//     const boardFirebaseKey = this.props.match.params.id;
//     boardsPinsData.getBoardsPins(boardFirebaseKey).then((response) => {
//       this.setState({
//         pins: response,
//       });
//     });
//     // this.getBoardInfo(this.props.match.params.id);

//     console.warn(this.props);

//     const renderPinsToDom = () => {
//       let display = '';
//       if (pins.length) {
//         display = pins.map((pin) => <PinCard pin={pin} key={pin.firebaseKey} />);
//       } else {
//         display = <h1 className="mt-2">No Pins Yet!</h1>;
//       }
//       return display;
//     };
//     console.warn(this.state);
//     return (
//     <div>
//       <AppModal title={'Update Board'} buttonLabel={'Update Board'}>
//         <BoardForm />
//       </AppModal>
//     <h1>{board.name}</h1>
//       <div className="pin-container d-flex flex-wrap justify-content-center">
//           {renderPinsToDom()}
//       </div>
//     </div>
//     );
//   }
// }

// export default SingleBoard;

import React from 'react';
import pinsData from '../helpers/data/pinsData';
import boardsData from '../helpers/data/boardsData';

import AppModal from '../components/AppModal';
import BoardForm from '../components/Forms/BoardForm';
import PinsCard from '../components/Cards/pinCard';

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

  render() {
    const { pins, board } = this.state;
    const renderPins = () => (
      // 4. map over the pins in state
      pins.map((pin) => (
         <PinsCard key={pin.firebaseKey} pin={pin} />
      ))
    );

    // 5. Render the pins on the DOM
    return (
      <div>
        <AppModal title={'Update Board'} buttonLabel={'Update Board'} >
          {Object.keys(board).length && <BoardForm board={board} onUpdate={this.getBoardInfo} />}
        </AppModal>
        <h1 className="mt-4">{board.name}</h1>
        <div className='d-flex flex-wrap container'>
          {renderPins()}
        </div>
      </div>
    );
  }
}
