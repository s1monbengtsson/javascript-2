/**
 * Service for communication with the json-server backend
 */

import axios from 'axios'
import { Todo, UpdateTodoData } from '../types'


const BASE_URL = 'http://localhost:3000'

/**
 * Create a new todo
 */

export const createTodo = async (todo: Todo) => {
	const res = await axios.post<Todo>(`${BASE_URL}/todos`, todo)
	return res.data
}

/**
 * Get all todos
 */

export const getTodos = async () => {
	const res = await axios.get<Todo[]>(`${BASE_URL}/todos`)
	return res.data
}

/**
 * Get a single todo
 */

export const getTodo = async (id: number) => {
	const res = await axios.get<Todo>(`${BASE_URL}/todos/${id}`)
	return res.data
}

/**
 * Update a todo
 */

export const updateTodo = async (id: number, todo: UpdateTodoData) => {
	const res = await axios.patch<Todo>(`${BASE_URL}/todos/${id}`, todo)
	return res.data
}

/**
 * Delete a todo
 */

export const deleteTodo = async (id: number) => {
	await axios.delete<Todo>(`${BASE_URL}/todos/${id}`)
}

