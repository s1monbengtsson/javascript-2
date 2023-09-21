import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Todo } from "../../types/Todo.types"
import { dummyTodos } from "../../data/todos"

const initialState: Todo[] = dummyTodos

export const todosSlice = createSlice({
	name: "todos",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<Todo>) => {
			state.push(action.payload)
		},
		toggle: (state, action: PayloadAction<string>) => {
			const todo = state.find((todo) => todo.id === action.payload)
			if (!todo) {
				return
			}
			todo.completed = !todo.completed
		},
		remove: (state, action: PayloadAction<string>) => {
			return state.filter((todo) => todo.id !== action.payload)
		},
	},
})

export const { add, toggle, remove } = todosSlice.actions

export default todosSlice.reducer
