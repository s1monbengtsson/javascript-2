import Container from "react-bootstrap/Container"
import useAuth from "../hooks/useAuth"

const HomePage = () => {
	const { currentUser } = useAuth()
	if (!currentUser) {
		throw new Error("YOU CAN BE A USER")
	}

	return (
		<Container className="py-3">
			<h1>InstaMemes</h1>
			<h2>When I get sad I stop being sad and be awesome instead</h2>

		</Container>
	)
}

export default HomePage
