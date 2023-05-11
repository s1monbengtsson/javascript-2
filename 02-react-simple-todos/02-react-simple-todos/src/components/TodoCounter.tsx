import React from 'react'

interface IProps {
  todos: number
  finishedTodos: number
}

const TodoCounter: React.FC<IProps> = ( { todos, finishedTodos } ) => {
  return (
    <div>
      {todos > 0 && (
				<p className="status">
					{finishedTodos}/{todos} todos completed
				</p>
				)}			

				{todos === 0 && (
					<p className='list-empty'>Yayyy, you have 0 todos to do</p>
				)}
    </div>
  )
}

export default TodoCounter