import { Timestamp } from "firebase/firestore";

export const firebaseTimestampToDate = (firebaseTimestamp: Timestamp) => {
    return firebaseTimestamp.toDate()
}

export const dateToIsoLocal = (date: Date) => {
    return date.toLocaleString()
}

/**
 * convert a firebase timestamp to an ISO string
 * @param firebaseTimestamp 
 * @returns 
 */

export const firebaseTimestamptoIsoLocal = (firebaseTimestamp: Timestamp) => {
    return dateToIsoLocal(firebaseTimestampToDate(firebaseTimestamp))
}