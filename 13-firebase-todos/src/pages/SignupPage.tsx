import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { SignUpCredentials } from '../types/User.types'
import { useRef } from 'react'
import useAuth from '../hooks/useAuth'
import { toast } from 'react-toastify'


const SignupPage = () => {

    const navigate = useNavigate()

    const { handleSubmit, register, watch, formState: { errors } } = useForm<SignUpCredentials>()

    const { signup } = useAuth()

    // watch the current value of `passform` form field
    const passwordRef = useRef("")
    passwordRef.current = watch('password')

    const onSignup: SubmitHandler<SignUpCredentials> = async (data) => {
        try {
            // pass email and password along to signup in auth context
            await signup(data.email, data.password)
            toast.success("Successfully signed in")
            setTimeout(() => {
                navigate('/')
            }, 1000)

        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                toast.error("Email already in use. Please try another email.")
            } else {
                toast.error(`${err.code}`)
            }
        }


    }


    return (
        <Row>
            <Col md={{ span:6, offset: 3 }}>
                <Card>

                    <Card.Body>
                        <Card.Title className='mb-3'>Sign Up</Card.Title>

                        <Form onSubmit={handleSubmit(onSignup)} noValidate>
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
                                        minLength: {
                                            value: 6,
                                            message: "Please enter at least 3 characters"
                                        }
                                    })}
                                />
                                {errors.password && <p  className='invalid'>{errors.password.message ?? "Invalid password"}</p>}
                                <Form.Text>Password must be at least 6 characters long</Form.Text>
                            </Form.Group>

                            <Form.Group controlId='confirmPassword' className='mb-3'>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    autoComplete='off'
                                    type='password'
                                    {...register('passwordConfirm', {
                                        required: "Enter your password again...",
                                        minLength: {
                                            value: 6,
                                            message: "Please enter at least 3 characters"
                                        },
                                        validate: (value) => {
                                            return value === passwordRef.current || "The passwords does not match"
                                        }
                                    })}
                                />
                                {errors.passwordConfirm && <p  className='invalid'>{errors.passwordConfirm.message ?? "Invalid value"}</p>}
                            </Form.Group>

                            <Button variant='primary' type='submit'>Create Account</Button>
                        </Form>

                        {/* <div className="text-center">
                            <Link to='/forgot-password'>Forgot Password</Link>
                        </div> */}
                    </Card.Body>
                </Card>

                <div className="text-center mt-3">
                    Already have an account?
                    <Link to='/login' className='mx-1'>Login?</Link>
                </div>
            </Col>
        </Row>
    )
}

export default SignupPage