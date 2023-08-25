import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import GlobalLoadingSpinner from './components/GlobalLoadingSpinner'
import Navigation from './components/Navigation'
import CreateTodoPage from './pages/CreateTodoPage'
import EditTodoPage from './pages/EditTodoPage'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import TodoPage from './pages/TodoPage'
import TodosPage from './pages/TodosPage'
import './assets/scss/App.scss'

const App = () => {
	return (
		<div id="App">
			<Navigation />
			<GlobalLoadingSpinner />

			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />

					<Route path="/todos">
						{/* /todos */}
						<Route path="" element={<TodosPage />} />

						{/* /todos/:id */}
						<Route path=":id" element={<TodoPage />} />

						{/* /todos/:id/edit */}
						<Route path=":id/edit" element={<EditTodoPage />} />

						{/* /todos/create */}
						<Route path="create" element={<CreateTodoPage />} />
					</Route>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>

			<ToastContainer 
				autoClose={1500}
				theme='dark'
				position='top-right'
			/>
			<ReactQueryDevtools initialIsOpen={false} position='bottom-right' />
		</div>
	)
}

export default App
