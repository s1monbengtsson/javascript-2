import { useState, useEffect } from "react"
import { CollectionReference, DocumentData, doc, getDoc } from "firebase/firestore"
import { Todo } from "../types/Todo.types"
import { db, todosCol } from "../servies/firebase"

const useGetTodo = (documentId: string) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<Todo|null>(null)
    const [error, setError] = useState(false)

    const getData = async () => {
        setError(false)
        setLoading(true)

        const docRef = doc(todosCol, documentId)
        const docSnap = await getDoc(docRef) 

        if (!docSnap.exists()) {
            setData(null)
            setError(true)
            setLoading(false)
            return
        }

        const data = {
            ...docSnap.data(),
            _id: docSnap.id   
        }

        setData(data)
        setLoading(false)
	}

    useEffect(() => {
        getData()
    }, [documentId])

    return { data, loading, getData }
}


export default useGetTodo