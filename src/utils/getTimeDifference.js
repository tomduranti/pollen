export default function getTimeDifference(timestamp1, timestamp2, ms) {
    /**
     * Compares two timestamps and returns true if the difference 
     * is greater than the given milliseconds.
     *
     * @param {Date} timestamp1 - The later (greater) Date object.
     * @param {Date} timestamp2 - The earlier (smaller) Date object.
     * @param {number} ms - The time span in milliseconds.
     * @returns {boolean} True if the difference is greater than ms, otherwise false.
     */

    const diff = timestamp1.getTime() - timestamp2.getTime();
    return diff > ms;
}