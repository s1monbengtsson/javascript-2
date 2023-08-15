/**
 * The Cat API Types
 */

export type Cat = {
	id: string
	url: string
	width: number
	height: number
}

export type ImageSearchResponse = Cat[]
