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

const deleteBoard = (boardFirebasekey) => axios.delete(`${baseUrl}/react-boards/${boardFirebasekey}.json`);

export default {
  getAllUserBoards,
  getSingleBoard,
  searchBoards,
  updateBoard,
  createBoard,
  deleteBoard,
};
