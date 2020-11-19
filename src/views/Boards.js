// import React, { Component } from 'react';
// import BoardContainer from '../components/BoardContainer';
// import Loader from '../components/Loader';
// import BoardForm from '../components/Forms/BoardForm';
// import boardsData from '../helpers/data/boardsData';
// import AppModal from '../components/AppModal';

// class Boards extends Component {
//   state = {
//     loading: true,
//     boards: [],
//   }

//   componentDidMount() {
//     this.setLoading();
//   }

//   setLoading = () => {
//     this.timer = setInterval(() => {
//       this.setState({ loading: false });
//     }, 1000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.timer);
//   }

//   getBoards = () => {
//     boardsData.getBoards().then((response) => {
//       this.setState({
//         boards: response,
//       });
//     });
//   }

//   render() {
//     const { loading } = this.state;
//     return (
//       <div>
//       { loading ? (
//         <Loader />
//       ) : (
//         <div>
//           <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
//             <BoardForm onUpdate={this.getBoards}/>
//           </AppModal>
//           <BoardContainer />
//         </div>
//       )}
//       </div>
//     );
//   }
// }

// export default Boards;

import React from 'react';
import boardsData from '../helpers/data/boardsData';
import authData from '../helpers/data/authData';

import BoardsCard from '../components/Cards/boardCard';
import Loader from '../components/Loader';
import AppModal from '../components/AppModal';
import BoardForm from '../components/Forms/BoardForm';

export default class Boards extends React.Component {
  state = {
    boards: [],
    loading: true,
  }

  componentDidMount() {
    this.getBoards();
  }

  getBoards = () => {
    const currentUserId = authData.getUid();
    boardsData.getAllUserBoards(currentUserId).then((response) => {
      this.setState({
        boards: response,
      }, this.setLoading);
    });
  }

  setLoading = () => {
    this.timer = setInterval(() => {
      this.setState({ loading: false });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  removeBoard = (e) => {
    const notRemovedBoards = this.state.boards.filter((board) => board.firebaseKey !== e.target.id);
    this.setState({
      boards: notRemovedBoards,
    });
    boardsData.deleteBoard(e.target.id)
      .then(() => {
        this.getBoards();
      });
  }

  render() {
    const { boards, loading } = this.state;
    const showBoards = () => (
      boards.map((board) => <BoardsCard key={board.firebaseKey} board={board} removeBoard={this.removeBoard}/>)
    );
    return (
      <>
        { loading ? (
          <Loader />
        ) : (
          <>
          <AppModal title={'Create Board'} buttonLabel={'Create Board'}>
            <BoardForm onUpdate={this.getBoards} />
          </AppModal>
          <div className='board-container d-flex flex-wrap justify-content-center'>
            {showBoards()}
          </div>
          </>
        )}
      </>
    );
  }
}
