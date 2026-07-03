export default function getCurrentHour() {
    const now = new Date;
    return now.getHours(); //returns typeof Number which becomes the index to fetch
}