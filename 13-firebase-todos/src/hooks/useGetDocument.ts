import { useEffect, useState } from "react"
import { Todo } from "../types/Todo.types"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../servies/firebase"

const useGetDocument = (colRef: string, id: string) => {
    const [loading, setLoading] = useState(false)
    const [todo, setTodo] = useState<Todo|null>(null)


    useEffect(() => {
        const getDocument = async (colRef: string, id: string) => {
            setLoading(true)
            const docRef = doc(db, colRef, String(id))
			const docSnap = await getDoc(docRef)
	
			const data = docSnap.data() as Todo

			setTodo(data)
            setLoading(false)
        }

        getDocument(colRef, id)
    }, [])

    return { loading, todo }
}

export default useGetDocument