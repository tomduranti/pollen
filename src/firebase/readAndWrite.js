import { getDatabase, ref, update, get, child, set } from "firebase/database";
import { app } from './config.js'

//* READ */
export async function isUserLocationSet(userId) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userId}/location`));
    return snapshot.exists() ? true : false;
}

export async function getUserName(userId) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userId}/userName`));
    if (snapshot.exists()) return snapshot.val();
}

export async function getUserDataFromDataBase(userId) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userId}`));
    if (snapshot.exists()) return snapshot.val();
}


//* WRITE */
export function updateUserPollen(userValue, userId) {
    const db = getDatabase(app);
    const updates = {};
    updates['users/' + userId + '/pollen/'] = userValue;
    return update(ref(db), updates);
}

export function updateUserLocation(userValue, userId) {
    const db = getDatabase(app);
    const updates = {};
    updates['users/' + userId + '/location'] = userValue;
    return update(ref(db), updates);
}

export function updateUserLocationTimestamp(newTimestamp, userId) {
    const db = getDatabase(app);
    return update(ref(db, 'users/' + userId + '/location'), {
        timestamp: newTimestamp,
    });
}

export function writeUserCredentials(userKey, userValue, userId) {
    const db = getDatabase(app);
    return set(ref(db, 'users/' + userId), {
        [userKey]: userValue,
    });
}