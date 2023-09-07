import { Todo } from "../types/Todo.types"
import { todosCol } from "../servies/firebase"
import useGetDocument from "./useGetDocument"

const useGetTodo = (documentId: string) => {
    return useGetDocument<Todo>(todosCol, documentId)

}

export default useGetTodo