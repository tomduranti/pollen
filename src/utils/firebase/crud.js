import { getDatabase, ref, update, get, set } from 'firebase/database';

import { app } from '@utils/firebase/config.js';

const db = getDatabase(app);
const write = (path, value) => set(ref(db, path), value);
//this snippet returns the object at that node, else null
const read = async (path) => (await get(ref(db, path))).val();

/* Create */
export const createUserData = (key, value, userId) =>
  write(`users/${userId}/${key}`, value);

/* Read */
export const readUserData = (userId) => read(`users/${userId}`);
export const readUserLocation = (userId) => read(`users/${userId}/location`);
export const readUserName = (userId) => read(`users/${userId}/userName`);
export const isUserLocationSet = async (userId) =>
  (await readUserLocation(userId)) !== null;
export const isUserNameSet = async (userId) =>
  (await readUserName(userId)) !== null;

/* Update */
export const updateUserPollenData = (value, userId) =>
  write(`users/${userId}/pollen`, value);
export const updateUserLocation = (value, userId) =>
  write(`users/${userId}/location`, value);

//TODO: delete this function once managing with Tan Stack
export function updateUserLocationTimestamp(newTimestamp, userId) {
  try {
    return update(ref(db, 'users/' + userId + '/location'), {
      timestamp: newTimestamp,
    });
  } catch (error) {
    console.error('Error updating user location timestamp:', error);
    return Promise.reject(error);
  }
}
