import { personnel } from './db';
// import mockData from './mockData';
import mockData from '../mockData2';
import forEach from 'lodash/forEach';

const generateRandomNumber = () => {
  return Math.random() - .5;
}

const generateRandomMovement = () => {
  let updatedMockData = {};
  const keys = Object.keys(mockData.personnel);

  keys.forEach(item => {
    const oldData = mockData.personnel[item];
    const oldPosition = mockData.personnel[item]['position'];

    updatedMockData[item] = oldData;
    updatedMockData[item]['position'] = {
      lat: oldPosition.lat + 0.01 * generateRandomNumber(),
      lng: oldPosition.lng + 0.01 * generateRandomNumber(),
    };
  })
  return personnel.set(updatedMockData);
}

export { generateRandomMovement };
