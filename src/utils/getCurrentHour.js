export default function getCurrentHour() {
    /**
     * Returns the number corresponding to the current hour e.g., 9, 11, 15, 17, etc. 
     * @returns {Number}
     */
    const now = new Date;
    return now.getHours();
}