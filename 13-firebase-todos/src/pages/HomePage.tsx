import Button from "react-bootstrap/Button"
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth"

const HomePage = () => {

	const { userEmail } = useAuth()
	return (
		<>
			<h1>Firebase Todos</h1>
			{userEmail && <h2>Welcome {userEmail}</h2>}

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
		</>
	)
}

export default HomePage
