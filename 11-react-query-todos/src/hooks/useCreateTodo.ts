import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { createTodo } from '../services/TodosAPI'
import { useNavigate } from 'react-router-dom'
import { Todo, Todos } from '../types/TodosAPI.types'

const useCreateTodo = () => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    return useMutation({
		mutationFn: createTodo,
		onSuccess: (newTodo: Todo) => {
            queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return [
					...prevTodos ?? [],
					newTodo,
				]
			})

			// also insert the new todo into the query cache
			queryClient.setQueryData(["todo", { id: newTodo.id }], newTodo)

			setTimeout(() => {
				navigate("/todos")
			}, 2000)
		}
	})
}

export default useCreateTodo