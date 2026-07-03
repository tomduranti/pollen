import { getDatabase, ref, update } from "firebase/database";
import { app, auth } from './firebaseConfig.js'

export function updateProfilePicture(userId, imageUrl) {
    const db = getDatabase(app);
    update(ref(db, 'users/' + userId), {
        profilePicture: imageUrl
    });
}

export function getUserUID() {
    const userId = auth.currentUser.uid;
    return userId;
}
