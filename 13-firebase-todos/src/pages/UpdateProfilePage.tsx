import { FirebaseError } from 'firebase/app'
import { useEffect, useRef, useState } from 'react'
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
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../services/firebase'
import { Image, ProgressBar } from 'react-bootstrap'

const UpdateProfilePage = () => {
	const [errorMessage, setErrorMessage] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const [uploadProgress, setUploadProgress] = useState<number | null >(null)
	const { currentUser, setDisplayName, setEmail, setPassword, setPhotoUrl, userPhotoUrl } = useAuth()
	const { handleSubmit, register, watch, formState: { errors } } = useForm<UpdateProfileFormData>({
		defaultValues: {
			email: currentUser?.email ?? "",
			displayName: currentUser?.displayName ?? ""
		}
	})

	const photoPlaceholder = "data:image/png;base64,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"

	// Watch the current value of `password` form field
	const passwordRef = useRef("")
	passwordRef.current = watch('password')
	
	const photoFileRef = useRef<FileList | null>(null)
	photoFileRef.current = watch('photoFile')
	
	if (!currentUser) return <p>Error, error, error!</p>

	const onUpdateProfile: SubmitHandler<UpdateProfileFormData> = async (data) => {
		// Clear any previous error state
		setErrorMessage(null)

		// Update user profile
		try {
			// Disable update-button while update is in progress
			setLoading(true)

			// Update displayName *ONLY* if it has changed
			if (data.displayName !== (currentUser.displayName ?? "")) {
				console.log("Updating display name...")
				await setDisplayName(data.displayName)
			}

			// only upload a photo if one has been selected
			if (data.photoFile.length) {
				const photo = data.photoFile[0]
				console.log("Would upload photo...", data.photoFile[0])

				// create a reference to upload the file to
				const fileRef = ref(storage, `photos/${currentUser.uid}/${photo.name}`) //photos/wegwGRGfwgwrgq2323566DWG/space.jpg
				const metadata = {
					contentType: 'image/jpeg'
				}

				setLoading(true)
				const uploadTask = uploadBytesResumable(fileRef, photo, metadata)
	
				uploadTask.on('state_changed', (snapshot) => {

					const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes * 1000) / 10
					setUploadProgress(progress)
					console.log("progress:", progress, '%')

				}, (err) => {
					console.log("Upload failed:", err)
					setErrorMessage("Upload failed...")

				}, async () => {

					// get download url to uploaded file
					const photoUrl = await getDownloadURL(fileRef)
	
					console.log("photo successfully uploaded, download url is:", photoUrl)

					// set download url as the user's photoURL
					await setPhotoUrl(photoUrl)
				})
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

	useEffect(() => {
		if (!userPhotoUrl) {
			setPhotoUrl(photoPlaceholder)
		}
	}, [])

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Header className='h3'>Update Profile</Card.Header>
						<Card.Body>
							{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}

							<Form onSubmit={handleSubmit(onUpdateProfile)}>
								<Form.Group controlId="photo" className="mb-3">
									<div className='d-flex flex-column align-items-center'>
										<Image 
											src={userPhotoUrl || photoPlaceholder}
											roundedCircle
											className='mb-3 w-50'
											style={{aspectRatio: '1', objectFit: 'cover', border: '2px solid grey'}}
										/>
										<Button 
											variant='danger' 
											className='mx-auto mb-3'
											size='sm' 
											onClick={() => setPhotoUrl(photoPlaceholder)}
											>Delete Profile Picture
										</Button>
									</div>

									<Form.Label>Change Profile Picture</Form.Label>
									<Form.Control
										type="file"
										accept='image/jpeg,image/png,image/webp,image/gif'
										{...register('photoFile')}
									/>
									{errors.photoFile && <p className="invalid">{errors.photoFile.message ?? "Invalid value"}</p>}
									<Form.Text>
										{uploadProgress !== null && uploadProgress < 100 
										? ( <ProgressBar 
												now={uploadProgress} 
												label={`${uploadProgress} %`}
												animated
												striped
												variant='success'
											/> ) 
										: (
											<span>
												{photoFileRef.current[0]?.name} 
												{' '} 
												({photoFileRef.current[0]?.size} kB)
											</span>
											)}
									</Form.Text>
								</Form.Group>

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

								<div className='d-flex'>
									<Button
										disabled={loading}
										variant="primary"
										type="submit"
									>
										{loading
											? "Updating profile..."
											: "Save"}
									</Button>
								</div>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default UpdateProfilePage