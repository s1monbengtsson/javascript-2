import { orderBy } from 'firebase/firestore'
import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useStreamCollection from './useStreamCollection'

const useGetTodos = () => {
	return useStreamCollection<Todo>(todosCol, orderBy('completed'), orderBy('title'))
}

export default useGetTodos
