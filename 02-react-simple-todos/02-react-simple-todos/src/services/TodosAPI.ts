/**
 * Service for communication with the json-server backend
 */

import axios from 'axios'
import { Todos, Todo, CreateTodoData, UpdateTodoData } from '../types'


const BASE_URL = 'http://localhost:3000'

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
 * Create a new todo
 */

export const createTodo = async (todo: CreateTodoData) => {
	const res = await axios.post<Todo>(`${BASE_URL}/todos`, todo)
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

export const deleteTodo = async(id: number) => {
	const res = await axios.delete<Todo>(`${BASE_URL}/todos/${id}`)
	return res.data
}

