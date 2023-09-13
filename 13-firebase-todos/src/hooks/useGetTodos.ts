import { collection, doc, getDoc, orderBy, query, where } from 'firebase/firestore'
import { db, todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useStreamCollection from './useStreamCollection'
import useAuth from './useAuth'

const useGetTodos = () => {
	return useStreamCollection<Todo>(todosCol, orderBy('completed'), orderBy('title'))
	// return query(collection(db, "todos"), where("user", "==", currentUser!.uid));
}

export default useGetTodos
