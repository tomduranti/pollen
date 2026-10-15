//functions
import { isUserLocationSet } from '@utils/index.js';

export async function redirectUserToLocation(userId, goto) {
    goto(await isUserLocationSet(userId) ? '/' : '/location');
}