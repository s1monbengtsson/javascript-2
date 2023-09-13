import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { FirebaseError } from "firebase/app"
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { ResetPassword } from "../types/User.types"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../services/firebase"

const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState<string|null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const { handleSubmit, register } = useForm<ResetPassword>()

    const onPasswordReset: SubmitHandler<ResetPassword> = async (data) => {
        // Clear any previous state
        setErrorMessage(null)

        try {
            setIsLoading(true)
            // pass email to get a password reset link sent to provided email
            sendPasswordResetEmail(auth, data.email)

            // send a toast with confirmation message
            toast.success("Password reset link has been sent to your email.")
            setTimeout(() => {
                navigate('/login')
            }, 1000)

        } catch (err) {
            if (err instanceof FirebaseError) {
                setErrorMessage(err.message)
                toast.error(errorMessage)
            } else {
                setErrorMessage("Something went wrong. Please try again!")
                toast.error("Something went wrong. Please try again!")
            }
            setIsLoading(false)
        }
    }

    return (
        <Container className='center-y'>
            <Row>
                <Col md={{ span:6, offset: 3 }}>
                    <Card>

                        <Card.Body>
                            <Card.Title className='mb-3'>Reset Password</Card.Title>

                            <Form onSubmit={handleSubmit(onPasswordReset)}>
                                <Form.Group controlId='email' className='mb-3'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder='yomama@hotmail.com'
                                        {...register('email', {
                                            required: 'You have to enter an email'
                                        })}
                                    />
                                </Form.Group>

                                <Button 
                                    variant='primary' 
                                    type='submit' 
                                    disabled={isLoading}
                                    >{isLoading 
                                        ? "Sending Email..." 
                                        : "Reset Password"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default ForgotPasswordPage