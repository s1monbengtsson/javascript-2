import { todosCol } from "../servies/firebase"
import { Todo } from "../types/Todo.types"
import useGetCollection from "./useGetCollection"

const useGetTodos = () => {
	return useGetCollection<Todo>(todosCol)
}

export default useGetTodos