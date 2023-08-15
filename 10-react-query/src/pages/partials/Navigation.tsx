import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { Link, NavLink } from 'react-router-dom'

const Navigation = () => {
    return (
        <Navbar expand="md" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">React Query</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/random-cat">Random Cat</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation