
import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import TodosPage from './pages/TodosPage'
import HomePage from './pages/HomePage'
import './assets/scss/App.scss'
import Navigation from './components/Navigation'
import TodoPage from './pages/TodoPage'
import NotFound from './pages/NotFound'
import CreateTodo from './pages/CreateTodoPage'
import EditTodo from './pages/EditTodoPage'
import EditTodoPage from './pages/EditTodoPage'


const App = () => {
	return (
		<div id="App">
			<Navigation/>
			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/todos">

						{/* /todos */}
						<Route path="" element={<TodosPage />} />

						{/* todos/:id */}
						<Route path=":id" element={<TodoPage />} />

						{/* todos/:id/edit */}
						<Route path=":id/edit" element={<EditTodoPage />} />

						{/* todos/create */}
						<Route path="create" element={<CreateTodo />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
} 

export default App
