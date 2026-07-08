import { getDatabase, ref, update, set } from "firebase/database";
import { app } from './firebaseConfig.js'

export function updateUserData(userKey, userValue, userId) {
    const db = getDatabase(app);
    return update(ref(db, 'users/' + userId), {
        [userKey]: userValue,
    });
}

export function writeUserData(userKey, userValue, userId) {
    const db = getDatabase(app);
    return set(ref(db, 'users/' + userId), {
        [userKey]: userValue,
    });
}