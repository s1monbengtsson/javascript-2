import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navigation = () => {

	const { currentUser } = useAuth()

	return (
		<Navbar bg="dark" variant="dark" expand="sm">
			<Container>
				<Navbar.Brand as={Link} to="/">🔥 Firebase Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{/* Options for logged out user */}
						{!currentUser && (
							<>
								<Nav.Link as={NavLink} end to="/login">Login</Nav.Link>
								<Nav.Link as={NavLink} end to="/signup">Signup</Nav.Link>
							</>
						)}
						
						{/* Options for logged in user */}
						{currentUser && (
							<>
								<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
								<Nav.Link as={NavLink} end to="/logout">Logout</Nav.Link>
							</>
						)}
								
						<Nav.Link>{currentUser?.email}</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
