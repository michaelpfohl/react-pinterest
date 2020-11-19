// import React, { Component } from 'react';
// import boardsData from '../../helpers/data/boardsData';
// import BoardCard from '../Cards/boardCard';

// class BoardContainer extends Component {
//   state = { boards: [] };

//   componentDidMount() {
//     this.loadData();
//   }

//   loadData = () => {
//     boardsData.getAllUserBoards().then((response) => {
//       console.warn(response);
//       this.setState({
//         boards: response,
//       });
//     });
//   }

//   render() {
//     const { boards } = this.state;
//     const renderBoardsToDom = () => boards.map((board) => <BoardCard board={board} key={board.firebaseKey}/>);
//     return (
//       <div className="board-container d-flex flex-wrap justify-content-center">
//         {renderBoardsToDom()}
//       </div>
//     );
//   }
// }

// export default BoardContainer;
