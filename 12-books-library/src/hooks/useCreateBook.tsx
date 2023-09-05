import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from "react-toastify"
import { createBook } from '../services/BooksAPI'
import { Book } from '../types/BooksAPI.types'

const useCreateBook = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: createBook,
		onError: () => {
			// 😳
			toast.warning(
				<>
					<strong>Something bad happened 😳!</strong><br />
					It was not possible to create the book. Please try again later.
				</>
			)
		},
		onSuccess: (newbook) => {
			// invalidate all books
			queryClient.invalidateQueries({
				queryKey: ['books']
			})

			// invalidate the author that we created the book on
			queryClient.invalidateQueries({
				queryKey: ['author', { id: newbook.authorId}]
			})

			// 🥂
			toast.success("Book created 🤩")
		}
	})
}

export default useCreateBook
