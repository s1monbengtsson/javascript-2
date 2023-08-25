import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTodo } from "../services/TodosAPI"
import { useNavigate } from "react-router-dom"
import { Todos } from "../types/TodosAPI.types"

const useDeleteTodo = (todoId: number, disableQueries: () => void = () => { return }) => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()


    return useMutation({
		mutationFn: () => deleteTodo(todoId),
		onSuccess: () => {
			// disable query for this specific single todo
			disableQueries()

			// remove the query for this specific single todo
			queryClient.removeQueries({ queryKey: ["todo", { id: todoId }] })

			// invalidate the query for all todos
			// queryClient.invalidateQueries({ queryKey: ["todos"] })
			// modify query cache for ["todos"] and construct a new array with
			// the deleted todo excluded
			queryClient.setQueryData<Todos>(["todos"], (prevTodos) => {
				return prevTodos?.filter(todo => todo.id !== todoId) ?? []
			})

			// Navigate user to `/todos` (with delete-status as state)
			navigate('/todos', {
				replace: true,
				state: {
					deleted: true,
				}
			})
		}
	})
}

export default useDeleteTodo