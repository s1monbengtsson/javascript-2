import { useEffect, useState } from "react"
import { CollectionReference, doc, getDoc } from "firebase/firestore"

const useGetDocument = <T>(colRef: CollectionReference<T>, documentId: string) => {
    const [data, setData] = useState<T|null>(null)
    const [loading, setLoading] = useState(false)
    const [_error, setError] = useState(false)


        const getData = async () => {
            setLoading(true)
            const docRef = doc(colRef, documentId)
			const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                setData(null)
                setError(true)
                setLoading(false)
                return
            }
	
			const data: T = {
                ...docSnap.data(),
                _id: docSnap.id
            }

			setData(data)
            setLoading(false)
        }


        useEffect(() => {
            getData()
        }, [])

    return { loading, data, getData }
}

export default useGetDocument