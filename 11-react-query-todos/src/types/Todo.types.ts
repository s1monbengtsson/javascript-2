export type Todo = {
	id?: number
	title: string
	completed: boolean
}

// exclude some keys from other type
export type NewTodo = Omit<Todo, "id">

// include some keys from other types
export type HalfTodo = Pick<Todo, "title" | "completed">

export type PartialTodo = Partial<Todo>

export type Todos = Todo[]
