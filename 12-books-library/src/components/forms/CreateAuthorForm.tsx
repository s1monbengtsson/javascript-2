import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify'
import { useForm, SubmitHandler } from 'react-hook-form'
import { NewAuthor } from '../../types/BooksAPI.types'

const CreateAuthorForm = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<NewAuthor>()
    const onCreateAuthorSubmit:SubmitHandler<NewAuthor> = (data) => {
        console.log("submitted data:", data)
    }

    return (
        <Form onSubmit={handleSubmit(onCreateAuthorSubmit)}>
            <Form.Group className='mb-3' controlId='name'>
                <Form.Label>Author Name</Form.Label>
                <Form.Control 
                    type='text' 
                    placeholder='Astrid Lindgren'
                    {...register('name', {
                        required: true,
                        minLength: 3
                    })}
                />
                {errors.name && <p className='text-danger'>Too few characters</p>}
            </Form.Group>

            <Form.Group className='mb-3' controlId='date_of_birth'>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control 
                    type='date' 
                    {...register('date_of_birth', {
                        required: true
                    })}
                />
                {errors.date_of_birth && <p className='text-danger'>Please enter a date</p>}
            </Form.Group>

            <div className="d-flex justify-content-end">
                <Button variant='success' type='submit'>Create</Button>
            </div>
        </Form>
    )
}

export default CreateAuthorForm