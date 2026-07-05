import {
    signOut,
} from 'firebase/auth';
import { auth } from './firebaseConfig';


// Sign out functionality
export async function firebaseSignOut() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

export function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
};