
import Container from 'react-bootstrap/Container'
import { Route, Routes } from 'react-router-dom'
import TodosPage from './pages/TodosPage'
import HomePage from './pages/HomePage'
import './assets/scss/App.scss'
import Navigation from './components/Navigation'
import TodoPage from './pages/TodoPage'
import NotFound from './pages/NotFound'
import CreateTodo from './pages/CreateTodoPage'
import EditTodo from './pages/EditTodo'


const App = () => {
	return (
		<div id="App">
			<Navigation/>
			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="/todos/create" element={<CreateTodo />} />
					<Route path="/todos/:id/edit" element={<EditTodo />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
} 

export default App
