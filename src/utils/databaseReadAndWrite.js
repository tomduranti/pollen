import { getDatabase, ref, update, child, get, set } from "firebase/database";
import { app, auth } from './firebaseConfig.js'



export function updateUserInfo(objWithUpdatedInfo) {
    const db = getDatabase(app);
    update(ref(db, 'users/' + getUserUID()), objWithUpdatedInfo);
}

export function getUserUID() {
    const userId = auth.currentUser;
    return userId;
}

export function writeUserData(userData, userSign) {
    const db = getDatabase(app);
    set(ref(db, 'users/' + userSign), {
        location: userData,
    });
}