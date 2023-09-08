import { Timestamp } from "firebase/firestore";

export const firebaseTimestampToDate = (firebaseTimestamp: Timestamp) => {
    return firebaseTimestamp.toDate()
}

/**
 * convert a firebase timestamp to an ISO string
 * @param firebaseTimestamp 
 * @returns 
 */


/**
 * Convert a Date to `YYYY-MM-DD HH:mm:ss` string
 */
export const dateToYmdHms = (date: Date) => {
	return Intl.DateTimeFormat('sv-SE', {
		dateStyle: 'short',
		timeStyle: 'short',
	}).format(date)
}

export const firebaseTimestamptoIsoLocal = (firebaseTimestamp: Timestamp) => {
    return dateToYmdHms(firebaseTimestampToDate(firebaseTimestamp))
}