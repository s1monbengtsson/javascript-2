import { useQuery } from '@tanstack/react-query'
import { getTodos } from '../services/TodosAPI'

const useTodos = () => {
	return useQuery(['todos'], getTodos)
}

export default useTodos
