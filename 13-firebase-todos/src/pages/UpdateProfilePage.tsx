import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import useAuth from '../hooks/useAuth'
import { UpdateProfileFormData } from '../types/User.types'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebase'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
	const [errorMessage, setErrorMessage] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
	const { handleSubmit } = useForm<UpdateProfileFormData>()
	const {  currentUser } = useAuth()

	const { setDisplayName,  setEmail, setPassword } = useAuth()

	const [newDisplayName, setNewDisplayName] = useState(currentUser?.displayName ?? "")
	const [newEmail, setNewEmail] = useState(currentUser?.email ?? "")
	const [_newPhotoURL, setNewPhotoURL] = useState(currentUser?.photoURL ?? "")
	const [newPassword, setNewPassword] = useState("")

	const navigate = useNavigate()

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async () => {
		// Clear any previous error state
		setErrorMessage(null)

		// Update user profile
		try {
			if (!currentUser) {
				return
			}
			// Disable update-button while update is in progress
			setLoading(true)

			// Update displayName *ONLY* if it has changed
			if (newDisplayName !== currentUser.displayName) {
				console.log("running inside displayname")
				await setDisplayName(newDisplayName)
			}

			// Update email *ONLY* if it has changed
			if (newEmail !== currentUser.email) {
				console.log("running inside email")
				await setEmail(newEmail)
			}
			
			// Update password *ONLY* if the user has provided a new password to set
			if (newPassword.length >= 6) {
				console.log("running inside password")
				await setPassword(newPassword)
			}

			// Reload user data

			// Show success toast 🥂
			toast.success("Successfully updated profile")

			// Enable update-button again
			setLoading(false)

		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
				setTimeout(() => {
					signOut(auth)
					navigate('/')
				}, 2500)
			} else {
				setErrorMessage("Something went wrong. Have you tried turning it off and on again?")
			}
			setLoading(false)
		}
	}

	if (!currentUser) {
		return 
	}

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Update Profile</Card.Title>

							{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}

							<Form onSubmit={handleSubmit(onUpdateProfile)}>
								{/*
									Fill the displayName, photoURL and email form fields with their current value!
								*/}
								<Form.Group controlId="displayName" className="mb-3">
									<Form.Label>Name</Form.Label>
									<Form.Control
										placeholder={currentUser.displayName ?? "Sean Banan"}
										type="text"
										onChange={e => setNewDisplayName(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="photoURL" className="mb-3">
									<Form.Label>Photo URL</Form.Label>
									<Form.Control
										placeholder={currentUser.photoURL ?? "https://www.chiquita.com/Bananana.jpg"}
										type="url"
										onChange={e => setNewPhotoURL(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder={currentUser.email ?? "snelhest2000@horsemail.com"}
 										type="email"
										onChange={e => setNewEmail(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="new-password"
										onChange={e => setNewPassword(e.target.value)}
									/>
									<Form.Text>At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										onChange={e => setPassword(e.target.value)}
									/>
								</Form.Group>

								<Button
									disabled={loading}
									variant="primary"
									type="submit"
								>
									{loading
										? "Updating profile..."
										: "Save"}
								</Button>
							</Form>

						</Card.Body>
					</Card>

				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfile