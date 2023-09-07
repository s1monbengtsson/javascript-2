import { useState } from "react"
import Button from "react-bootstrap/Button"
import { Link, useNavigate, useParams } from "react-router-dom"
import ConfirmationModal from "../components/ConfirmationModal"
import useGetTodo from "../hooks/useGetTodo"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { db } from "../servies/firebase"

const TodoPage = () => {
	const [showConfirmDelete, setShowConfirmDelete] = useState(false)
	const { id } = useParams()

	const documentId = id as string
	
	const { data: todo, loading, getData: getTodo } = useGetTodo(documentId)

	const navigate = useNavigate()

	if (!todo) {
		return
	}

	const timestamp = (todo.created_at.seconds+todo.created_at.nanoseconds*10**-9)*1000
	const createdAt = new Date(timestamp).toLocaleString()

	const toggleTodo = async () => {

		const todoRef = doc(db, "todos", documentId)

		await updateDoc(todoRef, {
			completed: !todo?.completed
		})

		getTodo()
	}

	const deleteTodo = async () => {

		await deleteDoc(doc(db, "todos", documentId))

		navigate('/todos', {
			replace: true
		})
	}

	return (
		<>
			{loading && <p>Loading...</p>}
			<h1>{todo.title}</h1>

			<p>
				<strong>Status:</strong>{" "}
				{todo.completed ? "Completed" : "Not completed"}
			</p>

			<p>
				<strong>Created At:</strong>{" "}
				{createdAt}
			</p>

			<div className="buttons mb-3">
				<Button
					variant="success"
					onClick={toggleTodo}
				>
					Toggle
				</Button>

				<Link to={`/todos/${todo._id}/edit`}>
					<Button variant="warning">Edit</Button>
				</Link>

				<Button
					variant="danger"
					onClick={() => setShowConfirmDelete(true)}
				>
					Delete
				</Button>
			</div>

			<ConfirmationModal
				show={showConfirmDelete}
				onCancel={() => setShowConfirmDelete(false)}
				onConfirm={deleteTodo}
			>
				U SURE BRO?!
			</ConfirmationModal>

			<Link to="/todos">
				<Button variant="secondary">&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
