import axios from 'axios';

const baseUrl = 'https://dinnterest-532dd.firebaseio.com/';

const getBoards = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/react-boards.json`).then((response) => {
    const boardData = response.data;
    const boards = [];
    if (boardData) {
      Object.keys(boardData).forEach((boardId) => {
        boards.push(boardData[boardId]);
      });
    }
    resolve(boards);
  }).catch((error) => reject(error));
});

export default { getBoards };
