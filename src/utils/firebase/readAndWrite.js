import { getDatabase, ref, update, get, child } from "firebase/database";
import { app } from '@utils/firebase/config.js'

const dbRef = ref(getDatabase(app));
const db = getDatabase(app);

/* READ */
export async function isUserLocationSet(userId) {
    try {
        const snapshot = await get(child(dbRef, `users/${userId}/location`));
        return snapshot.exists();
    } catch (error) {
        console.error('Error checking if user location is set:', error);
        return false;
    }
}

export async function isUserNameSet(userId) {
    try {
        const snapshot = await get(child(dbRef, `users/${userId}/userName`));
        return snapshot.exists();
    } catch (error) {
        console.error('Error checking if user name is set:', error);
        return false;
    }
}

export async function getUserName(userId) {
    try {
        const snapshot = await get(child(dbRef, `users/${userId}/userName`));
        if (snapshot.exists()) return snapshot.val();
        return null;
    } catch (error) {
        console.error('Error fetching user name:', error);
        return null;
    }
}

export async function getUserDataFromDataBase(userId) {
    try {
        const snapshot = await get(child(dbRef, `users/${userId}`));
        if (snapshot.exists()) return snapshot.val();
        return null;
    } catch (error) {
        console.error('Error fetching user data from database:', error);
        return null;
    }
}


/* WRITE */
export function updateUserPollen(userValue, userId) {
    try {
        const updates = {};
        updates['users/' + userId + '/pollen/'] = userValue;
        return update(ref(db), updates);
    } catch (error) {
        console.error('Error updating user pollen:', error);
        return Promise.reject(error);
    }
}

export function updateUserLocation(userValue, userId) {
    try {
        const updates = {};
        updates['users/' + userId + '/location'] = userValue;
        return update(ref(db), updates);
    } catch (error) {
        console.error('Error updating user location:', error);
        return Promise.reject(error);
    }
}

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

export function writeUserCredentials(userKey, userValue, userId) {
    try {
        return update(ref(db, 'users/' + userId), {
            [userKey]: userValue,
        });
    } catch (error) {
        console.error('Error writing user credentials:', error);
        return Promise.reject(error);
    }
}