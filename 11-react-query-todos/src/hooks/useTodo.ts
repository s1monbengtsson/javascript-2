import { useQuery } from '@tanstack/react-query'
import { getTodo } from '../services/TodosAPI'

const useTodo = <T = any>(todo_id: number) => {
	return useQuery<T>(['todo', {  id: todo_id }], () => getTodo(todo_id))
}

export default useTodo
