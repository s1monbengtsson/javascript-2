import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../servies/firebase";
import { Todo, Todos } from "../types/Todo.types";

const useGetCollection = (col:string) => {
    const [todos, setTodos] = useState<Todos|null>(null)
    const [loading, setLoading] = useState(false)

    
        const getCollection = async (col: string) => {
            setLoading(true)

            const querySnapshot = await getDocs(collection(db, col));
            const data = querySnapshot.docs.map((doc) => ({
                _id: doc.id,
                ...doc.data(),
            } as Todo))

            setTodos(data)
            setLoading(false)
        }


    useEffect(() => {
        getCollection(col)
    }, [])

    return { todos, loading, getCollection }
}

export default useGetCollection