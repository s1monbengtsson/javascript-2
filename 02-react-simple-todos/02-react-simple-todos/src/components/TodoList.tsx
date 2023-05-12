import React from 'react'
import { Todo } from '../types'
import TodoListItem from './TodoListItem'

interface IProps {
  onToggle: (todo: Todo) => void
  onDelete: (todoToDelete: Todo) => void
  todos: Todo[]
  value: string
}

const TodoList: React.FC<IProps> = ({ onToggle, onDelete, todos, value }) => {
  return (
    <ul className="todo-list">
      <span className="section-title">{value}</span>
      {todos.map((todo, index) => (
        
        <TodoListItem 
          onToggle={onToggle}
          onDelete={onDelete}
          todo={todo} 
          key={index} 
        />
      ) )}
    </ul>
  )
}

export default TodoList