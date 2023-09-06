export type Todo = {
	_id: string
	title: string
	completed: boolean
	created_at: {
		seconds: number
		nanoseconds: number
	}
}
export type NewTodo = Omit<Todo, "_id">
export type PartialTodo = Partial<Todo>

export type Todos = Todo[]
