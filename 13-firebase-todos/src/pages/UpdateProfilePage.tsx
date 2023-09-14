import { FirebaseError } from 'firebase/app'
import { useRef, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from "react-bootstrap/Container"
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { UpdateProfileFormData } from '../types/User.types'

const UpdateProfilePage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const { currentUser, setDisplayName, setEmail, setPassword, setPhotoUrl } = useAuth()
	const { handleSubmit, register, watch, formState: { errors } } = useForm<UpdateProfileFormData>({
		defaultValues: {
			email: currentUser?.email ?? "",
			displayName: currentUser?.displayName ?? "",
			photoURL: currentUser?.photoURL ?? "",
		}
	})

	// Watch the current value of `password` form field
	const passwordRef = useRef("")
	passwordRef.current = watch('password')

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		// Clear any previous error state
		setErrorMessage(null)

		// Update user profile
		try {
			// Disable update-button while update is in progress
			setLoading(true)

			// Update displayName *ONLY* if it has changed
			if (data.displayName !== (currentUser?.displayName ?? "")) {
				console.log("Updating display name...")
				await setDisplayName(data.displayName)
			}

			// Update photoUrl *ONLY* if it has changed
			if (data.photoURL !== (currentUser?.photoURL ?? "")) {
				console.log("Updating photo url...")
				await setPhotoUrl(data.photoURL)
			}

			// Update email *ONLY* if it has changed
			if (data.email !== (currentUser?.email ?? "")) {
				console.log("Updating email...")
				await setEmail(data.email)
			}

			// Update password *ONLY* if the user has provided a new password to set
			if (data.password) {
				console.log("Updating password...")
				await setPassword(data.password)
			}

			// Reload user data
			// await reloadUser()

			// Show success toast 🥂
			toast.success("Profile successfully updated")

			// Enable update-button again
			setLoading(false)
			console.log("All ok 👍🏻👍🏻👍🏻!")

		} catch (error) {
			if (error instanceof FirebaseError) {
				setErrorMessage(error.message)
			} else {
				setErrorMessage("Something went wrong. Have you tried turning it off and on again?")
			}
			setLoading(false)
		}
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
										placeholder="Sean Banan"
										type="text"
										{...register('displayName', {
											minLength: {
												value: 3,
												message: "If you have a name, it has to be at least 3 characters long"
											}
										})}
									/>
									{errors.displayName && <p className="invalid">{errors.displayName.message ?? "Invalid value"}</p>}
								</Form.Group>

								<Form.Group controlId="photoURL" className="mb-3">
									<Form.Label>Photo URL</Form.Label>
									<Form.Control
										placeholder="https://www.chiquita.com/Bananana.jpg"
										type="url"
										{...register('photoURL')}
									/>
									{errors.photoURL && <p className="invalid">{errors.photoURL.message ?? "Invalid value"}</p>}
								</Form.Group>

								<Form.Group controlId="email" className="mb-3">
									<Form.Label>Email</Form.Label>
									<Form.Control
										placeholder="snelhest2000@horsemail.com"
										type="email"
										{...register('email', {
											required: "You have to enter an email",
										})}
									/>
									{errors.email && <p className="invalid">{errors.email.message ?? "Invalid value"}</p>}
								</Form.Group>

								<Form.Group controlId="password" className="mb-3">
									<Form.Label>Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="new-password"
										{...register('password', {
											minLength: {
												value: 3,
												message: "Please enter at least 3 characters"
											},
										})}
									/>
									{errors.password && <p className="invalid">{errors.password.message ?? "Invalid value"}</p>}
									<Form.Text>At least 6 characters</Form.Text>
								</Form.Group>

								<Form.Group controlId="confirmPassword" className="mb-3">
									<Form.Label>Confirm Password</Form.Label>
									<Form.Control
										type="password"
										autoComplete="off"
										{...register('passwordConfirm', {
											minLength: {
												value: 3,
												message: "Please enter at least 3 characters"
											},
											validate: (value) => {
												return !passwordRef.current || value === passwordRef.current || "The passwords does not match 🤦🏼‍♂️"
											}
										})}
									/>
									{errors.passwordConfirm && <p className="invalid">{errors.passwordConfirm.message ?? "Invalid value"}</p>}
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

export default UpdateProfilePage