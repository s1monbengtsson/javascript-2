import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { Image, NavDropdown } from 'react-bootstrap'
import RequireAuth from '../../components/RequireAuth'

const Navigation = () => {

	const { currentUser, userEmail, userName, userPhotoUrl } = useAuth()

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🔥 Firebase Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{/* Options  */}
						{!currentUser ? 
							<>
								<Nav.Link as={NavLink} end to="/login">Login</Nav.Link>
								<Nav.Link as={NavLink} end to="/signup">Signup</Nav.Link>
							</>
							:	
							<>
								<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
								<NavDropdown
								title={
									userPhotoUrl
									? <Image
										src={userPhotoUrl}
										height={30}
										width={30}
										title={(userName || userEmail) ?? ""}
										roundedCircle />
									: userName || userEmail
								}
							>
								<RequireAuth>
									<NavDropdown.Item as={NavLink} to='/update-profile'>Update Profile</NavDropdown.Item>
								</RequireAuth>
									<NavDropdown.Divider />
									<NavDropdown.Item as={NavLink} to='/logout'>Logout</NavDropdown.Item>
								</NavDropdown>
							</>
						}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
