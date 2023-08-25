import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
const HomePage = () => {
	return (
		<>
			<h1>Welcome to Better Todos!</h1>

			<ButtonGroup>
				<Button 
					variant='primary'
					onClick={() => toast("Wow so cool")}	
				>Try me
				</Button>
			</ButtonGroup>
		</>
	)
}

export default HomePage
