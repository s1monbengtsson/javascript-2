import './App.css'
import { useState } from 'react'

const App = () => {

	const [msg, setMsg] = useState("Hi mom, I'm stateful")

	const handleButtonClick = () => {
		setMsg("By mom")
	}

	return (
		<div className="App">
			<h1>React basics</h1>

			<h2>{msg}</h2>

			<p>You have clicked the button 0 times</p>

			<button onClick={handleButtonClick} className="btn btn-success btn-lg">👆 me!</button>
		</div>
	)
}

export default App
