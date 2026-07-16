import { getDatabase, ref, update, get, child, set } from "firebase/database";
import { app } from './config.js'

//* READ */
export async function getUserLocation(userUid) {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userUid}/location`));
    return snapshot.exists() ? true : false;
}

export async function getUserName(userUid) {
    let arr;
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userUid}/userName`));
    if (snapshot.exists()) return arr = snapshot.val();
}

export async function getUserDataFromDataBase(userUid) {
    let arr;
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userUid}`));
    if (snapshot.exists()) return arr = snapshot.val();
}


//* WRITE */
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