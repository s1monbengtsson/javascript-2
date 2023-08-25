import { useQuery } from '@tanstack/react-query'
import * as TodosAPI from '../services/TodosAPI'

const useTodos = <T>() => {
	return useQuery<T>(['todos'], TodosAPI.getTodos)
}

export default useTodos
