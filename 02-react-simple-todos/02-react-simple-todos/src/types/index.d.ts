export type Todo = {
  id?: number
  title: string
  completed: boolean
  }

export type UpdateTodoData = Partial<Todo>

export type Todos = Todo[]