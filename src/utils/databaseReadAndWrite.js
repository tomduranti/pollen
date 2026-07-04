import { getDatabase, ref, update } from "firebase/database";
import { app, auth } from './firebaseConfig.js'

export function updateUserInfo(objWithUpdatedInfo) {
    const db = getDatabase(app);
    update(ref(db, 'users/' + getUserUID()), objWithUpdatedInfo);
}

export function getUserUID() {
    const userId = auth.currentUser.uid;
    return userId;
}
