import axios from 'axios';
import pinsData from './pinsData';

const baseUrl = 'https://dinnterest-532dd.firebaseio.com/';

const objToArray = (objOfObjs) => {
  const array = [];
  Object.keys(objOfObjs).forEach((key) => {
    array.push(objOfObjs[key]);
  });
  return array;
};

const getBoardsPins = (boardFirebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/react-boards-pins.json?orderBy="boardId"&equalTo="${boardFirebaseKey}"`).then((response) => {
    const boardsArray = objToArray(response.data);
    console.warn(boardsArray);
    pinsData.getPins().then((pinsRes) => {
      const pinObjectArray = [];
      boardsArray.forEach((pinBoard) => {
        const pinObject = pinsRes.find((pin) => pin.firebaseKey === pinBoard.pinId);
        pinObjectArray.push(pinObject);
      });
      resolve(pinObjectArray);
    });
  }).catch((error) => reject(error));
});

export default { getBoardsPins };
