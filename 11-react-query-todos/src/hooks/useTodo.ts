import { useQuery } from '@tanstack/react-query'
import { getTodo } from '../services/TodosAPI'

const useTodo = (todo_id: number, enabled = true) => {
	return useQuery(['todo', {  id: todo_id }], () => getTodo(todo_id), { enabled: enabled })
}

export default useTodo
