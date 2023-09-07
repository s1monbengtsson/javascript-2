import { CollectionReference, getDocs } from "firebase/firestore"
import { useEffect, useState } from "react"

const useGetCollection = <T>(colRef: CollectionReference<T>) => {
    const [data, setData] = useState<T[]|null>(null)
    const [loading, setLoading] = useState(false)

    const getData = async () => {
        setLoading(true)

        const snapshot = await getDocs(colRef)

        const data: T[] = snapshot.docs.map(doc => {
            return {
                ...doc.data(),
                _id: doc.id
            }
        })

        setData(data)
        setLoading(false)
    }


    useEffect(() => {
        getData()
    }, [])

    return { data, loading, getData }
}

export default useGetCollection