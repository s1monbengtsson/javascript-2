import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useStreamDocument from './useStreamDocument'

const useGetTodo = (documentId: string) => {
	return useStreamDocument<Todo>(todosCol, documentId)
}

export default useGetTodo
