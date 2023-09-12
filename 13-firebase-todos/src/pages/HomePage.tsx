import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth"
import Container from "react-bootstrap/Container"

const HomePage = () => {

	const { currentUser } = useAuth()

	return (
		<Container className="mt-3">
			<h1>Firebase Todos</h1>
			{/* {userEmail && <h2>Welcome {userEmail}</h2>} */}

			{currentUser 
				? <p>You are logged in as {currentUser.email}</p>
				: <p>You are logged in as anonymous</p>
			}

			<ButtonGroup>
				<Button
					variant="danger"
					size="lg"
					onClick={() => {
						toast.error(
							"🚂 CHOO-CHOO, GET ON DA HYPE TRAIINNNN!!111"
						)
					}}
				>
					HYPE ME 🔥
				</Button>
			</ButtonGroup>
		</Container>
	)
}

export default HomePage
