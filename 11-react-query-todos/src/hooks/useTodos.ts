import { useQuery } from '@tanstack/react-query'
import { getTodos } from '../services/TodosAPI'

const useTodos = <T = any>() => {
	return useQuery<T>(['todos'], getTodos)
}

export default useTodos
