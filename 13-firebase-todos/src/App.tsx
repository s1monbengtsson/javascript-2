import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Navigation from './pages/partials/Navigation'
import EditTodoPage from './pages/EditTodoPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import NotFound from './pages/NotFound'
import SignupPage from './pages/SignupPage'
import TodoPage from './pages/TodoPage'
import TodosPage from './pages/TodosPage'
import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />

				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/signup" element={<SignupPage />} />

				<Route path="/todos">
					{/* /todos */}
					<Route path="" element={<TodosPage />} />

					{/* /todos/:id */}
					<Route path=":id" element={<TodoPage />} />

					{/* /todos/:id/edit */}
					<Route path=":id/edit" element={<EditTodoPage />} />
				</Route>

				<Route path="*" element={<NotFound />} />
			</Routes>

			<ToastContainer
				theme='colored'
			/>
		</div>
	)
}

export default App