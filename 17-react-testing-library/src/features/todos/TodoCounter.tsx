import React from 'react'

type TodoCounterProps = {
	count: number
}

const TodoCounter: React.FC<TodoCounterProps> = ({ count }) => {
	const msg = count
		? count === 1
			? <span>You only have 1 todo left, get on it 🤩!</span>
			: <span>You have {count} todos left 😩</span>
		: <span>You have 0 todos 🥳!</span>

	return (
		<div className="todo-counter mt-2" data-testid="todo-counter">
			{msg}
		</div>
	)
}

export default TodoCounter
