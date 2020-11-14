import axios from 'axios';

const baseUrl = 'https://dinnterest-532dd.firebaseio.com/';

const patchFBBoardKeys = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/react-boards.json`).then((response) => {
    const keys = Object.keys(response.data);
    keys.forEach((key) => {
      axios.patch(`${baseUrl}/react-boards/${key}.json`, { firebaseKey: key });
    });
  }).catch((error) => reject(error));
});

const patchFBPinKeys = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/react-pins.json`).then((response) => {
    const keys = Object.keys(response.data);
    keys.forEach((key) => {
      axios.patch(`${baseUrl}/react-pins/${key}.json`, { firebaseKey: key });
    });
  }).catch((error) => reject(error));
});

export default { patchFBBoardKeys, patchFBPinKeys };
