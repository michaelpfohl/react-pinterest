// import axios from 'axios';

// const baseUrl = 'https://dinnterest-532dd.firebaseio.com/';

// const getBoards = () => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/react-boards.json`).then((response) => {
//     const boardData = response.data;
//     const boards = [];
//     if (boardData) {
//       Object.keys(boardData).forEach((boardId) => {
//         boards.push(boardData[boardId]);
//       });
//     }
//     resolve(boards);
//   }).catch((error) => reject(error));
// });

// const createBoard = (boardObj) => new Promise((resolve, reject) => {
//   axios.post(`${baseUrl}/react-boards/${boardObj.firebaseKey}.json`, boardObj)
//     .then((response) => {
//       axios.patch(`${baseUrl}/react-boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then((res) => {
//         resolve(res);
//       });
//     }).catch((error) => reject(error));
// });

// const updateBoard = (boardObj) => new Promise((resolve, reject) => {
//   axios.patch(`${baseUrl}/${boardObj.firebaseKey}.json`, boardObj).then((response) => {
//     resolve(response);
//   }).catch((error) => reject(error));
// });

// const getSingleBoard = (boardFirebaseKey) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/react-boards/${boardFirebaseKey}.json`)
//     .then((response) => resolve(response)).catch((error) => reject(error));
// });

// export default {
//   getBoards, createBoard, updateBoard, getSingleBoard,
// };

import axios from 'axios';

const baseUrl = 'https://dinnterest-532dd.firebaseio.com';

const getAllUserBoards = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/react-boards.json?orderBy="userId"&equalTo="${uid}"`).then((response) => {
    resolve(Object.values(response.data));
  }).catch((error) => reject(error));
});

const getSingleBoard = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/react-boards/${boardId}.json`).then((response) => {
    resolve(response.data);
  }).catch((error) => reject(error));
});

const searchBoards = (uid, searchTerm) => new Promise((resolve, reject) => {
  getAllUserBoards(uid).then((response) => {
    const searchResults = response.filter((res) => res.name.toLowerCase().includes(searchTerm) || res.description.toLowerCase().includes(searchTerm));
    resolve(searchResults);
  }).catch((error) => reject(error));
});

const createBoard = (boardObj) => new Promise((resolve, reject) => {
  axios.post(`${baseUrl}/react-boards.json`, boardObj)
    .then((response) => {
      console.warn(response);
      axios.patch(`${baseUrl}/react-boards/${response.data.name}.json`, { firebaseKey: response.data.name }).then((res) => {
        resolve(res);
      });
    }).catch((error) => reject(error));
});

const updateBoard = (boardObj) => new Promise((resolve, reject) => {
  axios.patch(`${baseUrl}/react-boards/${boardObj.firebaseKey}.json`, boardObj).then((response) => {
    resolve(response);
  }).catch((error) => reject(error));
});

export default {
  getAllUserBoards, getSingleBoard, searchBoards, updateBoard, createBoard,
};
