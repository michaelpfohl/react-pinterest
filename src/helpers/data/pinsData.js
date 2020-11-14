import axios from 'axios';

const baseUrl = 'https://dinnterest-532dd.firebaseio.com/';

const getPins = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/react-pins.json`).then((response) => {
    const pinData = response.data;
    const pins = [];
    if (pinData) {
      Object.keys(pinData).forEach((pinId) => {
        pins.push(pinData[pinId]);
      });
    }
    resolve(pins);
  }).catch((error) => reject(error));
});

export default { getPins };
