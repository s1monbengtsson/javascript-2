import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateTodo } from "../services/TodosAPI"
import { PartialTodo, Todo } from "../types/TodosAPI.types"

const useUpdateTodo = (todoId: number, onSuccess: (todo: Todo) => void = () => { return }) => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: PartialTodo) => updateTodo(todoId, data),

        onSuccess: (updatedTodo) => {
			// set the response from the mutation as the query cache for the specific single todo
			queryClient.setQueryData(["todo", { id: todoId }], updatedTodo)

            // trigger refetch all todos
			queryClient.refetchQueries({ queryKey: ["todos"] })

            // call onSuccess-method passed to our custom hook
            // optional defaults to empty function
            onSuccess(updatedTodo)
		},
    })
}

export default useUpdateTodo