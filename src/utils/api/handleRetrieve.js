//functions
import { updateUserLocation } from '@utils/firebase/crud.js';
import { getLocationObject } from '@utils/api/getLocationObject.js';


export const handleRetrieve = (userId, callback) => {
    return (
        async res => {
            await updateUserLocation(getLocationObject(res), userId);
            callback();
        }
    )
};