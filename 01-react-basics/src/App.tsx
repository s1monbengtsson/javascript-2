import { useState } from 'react'
import './App.css'

type Post = {
	title: string
	likes: number
}

const App = () => {
	const [msg, setMsg] = useState("Hi mom, I'm stateful")
	const [clicks, setClicks] = useState(0)
	const [posts, setPosts] = useState<Post[]>([
		{ title: "React Rocks 🤘🏻!", likes: 1337 },
		{ title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },
		{ title: "Got state?", likes: 3 },
	])

	const [salary, setSalary] = useState(10)
	const [lowSalary, setLowSalary] = useState('')

	/*
	const increaseSalary = (amount: number) => {
		setSalary(salary+amount)

		if((salary + amount >= 5)) {
			setLowSalary('')
		}
	}
	*/

	/*
	const decreaseSalary = (amount:number) => {
		if ((salary - amount) >= 5) {
			setLowSalary('')
		} else {
			setLowSalary('Salary not accepted')
			return
		}
		setSalary(salary - amount)
	}
	*/

	const handleAdjustSalary = (amount: number, operation: string) => {

		if (salary >= 5) {
			setLowSalary('')
		}

		switch(operation) {
			case "+":
				setSalary(salary+amount)
				break

			case "-":
				if ((salary-amount) < 5) {
					setLowSalary('Lower salary not accepted')
					setSalary(5)
					return
				} else {
					setSalary(salary-amount)
				}
				break
		}
		
			
	}

	const handleButtonClick = () => {
		setClicks(clicks + 1)
		// console.log("Clicks:", clicks)
	}

	console.log("Rendering...")

	return (
		<div className="App">
			<h1>React Basics</h1>

			<h2>{msg}</h2>

			<p>You have clicked the button {clicks} times.</p>

			<button onClick={handleButtonClick} className="btn btn-success btn-lg">👆🏻 me!</button>

			<button onClick={ () => { setMsg('Hi dad!') } } className="btn btn-warning btn-lg">Hi dad!</button>

			<hr />

			<p>Salary per hour: {salary} &euro;</p>

			{salary < 10 && (
				<div className='alert alert-warning'>You might want to change job</div>
			)}

			<div className="buttons">
				<div className="mb-1">
					<button
					onClick={() => handleAdjustSalary(1, "+")}
						className="btn btn-primary btn-lg"
					>Raise 1 &euro; 🤑</button>
					<button
					onClick={() => handleAdjustSalary(1, "-")}
						className="btn btn-warning btn-lg"
					>Decrease 1 &euro; 😢</button>
				</div>

				<div className="mb-1">
					<button
					onClick={() => handleAdjustSalary(5, "+")}
						className="btn btn-success btn-lg"
					>Raise 5 &euro; 🤑🤑🤑</button>
					<button
					onClick={() => handleAdjustSalary(5, "-")}
						className="btn btn-danger btn-lg"
					>Decrease 5 &euro; 😢😢😢</button>
				</div>
			</div>

			<hr />

			<h2>Posts</h2>

			<ul>
				{
					posts.map( (post, index) => (
						<li key={index}>
							{post.title} ({post.likes} likes)
						</li>
					))
				}
			</ul>
		</div>
	)
}

export default App