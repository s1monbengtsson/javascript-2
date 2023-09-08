import { CollectionReference, QueryConstraint, onSnapshot, query } from 'firebase/firestore'
import { useEffect, useState } from 'react'

const useStreamCollection = <T>(colRef: CollectionReference<T>, ...queryContstraints: QueryConstraint[]) => {

	const [data, setData] = useState<T[]|null>(null)
	const [loading, setLoading] = useState(true)

	// Get data on component mount
	useEffect(() => {
		//Construct a query reference
		const queryRef = query(colRef, ...queryContstraints)

		// Subscribe to changes in the collection
		const unsubscribe = onSnapshot(queryRef, (snapshot) => {
			console.log("Got me some data 🤑")
			// loop over all docs
			const data: T[] = snapshot.docs.map(doc => {
				return {
					...doc.data(),
					_id: doc.id,
				}
			})
			
			setData(data)
			setLoading(false)
		})

		// Return unsubscribe function as cleanup. Will unsubscribe when component is unmounted
		return unsubscribe
	}, [colRef])

	return {
		data,
		loading,
	}
}

export default useStreamCollection
