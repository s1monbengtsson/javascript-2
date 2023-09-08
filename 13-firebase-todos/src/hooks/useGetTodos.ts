import { todosCol } from '../services/firebase'
import { Todo } from '../types/Todo.types'
import useStreamCollection from './useStreamCollection'

const useGetTodos = () => {
	return useStreamCollection<Todo>(todosCol)
}

export default useGetTodos
