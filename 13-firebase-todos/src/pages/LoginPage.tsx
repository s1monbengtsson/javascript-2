import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { LoginCredentials } from '../types/User.types'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'
import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { Container } from 'react-bootstrap'

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { handleSubmit, register, formState: { errors } } = useForm<LoginCredentials>()
    const { login } = useAuth()

    const onLogin: SubmitHandler<LoginCredentials> = async (data) => {
        try {
            setIsLoading(true)
            // login user
            await login(data.email, data.password)
            toast.success("Successfully signed in as " + data.email)
            setTimeout(() => {
                navigate('/')
            }, 1000)
        } catch (err) {
            if (err instanceof FirebaseError) {
                toast.error(`${err.message}`)
            } else {
                toast.error("Something went wrong. Please try again!")
            }
            setIsLoading(false)
        }
    }

    return (
        <Container className='center-y'>
            <Row className='mt-3'>
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>

                        <Card.Body>
                            <Card.Title className='mb-3'>Login</Card.Title>

                            <Form onSubmit={handleSubmit(onLogin)}>
                                <Form.Group controlId='email' className='mb-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='yomama@hotmail.com'
                                        {...register('email', {
                                            required: 'You have to enter an email'
                                        })}
                                    />
                                    {errors.email && <p  className='invalid'>{errors.email.message ?? "Invalid email"}</p>}
                                </Form.Group>

                                <Form.Group controlId='password' className='mb-3'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        autoComplete='new-password'
                                        type='password'
                                        {...register('password', {
                                            required: "You're kidding, right? Enter a password...",
                                        })}
                                    />
                                    {errors.password && <p  className='invalid'>{errors.password.message ?? "Invalid password"}</p>}
                                </Form.Group>


                                <Button 
                                    variant='primary' 
                                    type='submit' 
                                    disabled={isLoading}
                                    >{isLoading 
                                        ? "Signing in..." 
                                        : "Sign in"}
                                </Button>
                            </Form>

                            <div className="text-center">
                                <Link to='/forgot-password'>Forgot Password</Link>
                            </div>
                        </Card.Body>
                    </Card>

                    <div className="text-center mt-3">
                        Don't have an account?
                        <Link to='/signup' className='mx-1'>Sign Up</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default LoginPage