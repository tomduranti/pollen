import { getDatabase, ref, update, get, child, set } from "firebase/database";
import { app } from './config.js'

export function updateUserData(userKey, userValue, userId) {
    const db = getDatabase(app);
    return update(ref(db, 'users/' + userId), {
        [userKey]: userValue,
    });
}

export function updateLocationTimestamp(newTimestamp, userId) {
    const db = getDatabase(app);
    return update(ref(db, 'users/' + userId + '/location'), {
        timestamp: newTimestamp,
    });
}

export function writeUserData(userKey, userValue, userId) {
    const db = getDatabase(app);
    return set(ref(db, 'users/' + userId), {
        [userKey]: userValue,
    });
}

export async function getUserLocation(userUid) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userUid}/location`));
    return snapshot.exists() ? true : false;
}