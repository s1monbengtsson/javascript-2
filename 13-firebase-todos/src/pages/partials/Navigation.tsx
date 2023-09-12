import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Navigation = () => {

	const { userEmail } = useAuth()

	return (
		<Navbar bg="dark" variant="dark" expand="sm" style={{width: '100%', marginLeft: '0'}}>
			<Container>
				<Navbar.Brand as={Link} to="/">🔥 Firebase Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} end to="/login">Login</Nav.Link>
						<Nav.Link as={NavLink} end to="/logout">Logout</Nav.Link>
						<Nav.Link as={NavLink} end to="/signup">Signup</Nav.Link>
						<Nav.Link as={NavLink} end to="/todos">Todos</Nav.Link>
						<Nav.Link>{userEmail}</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
