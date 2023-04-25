import './App.css'
import { useState } from 'react'

type Post = {
	title: string
	likes: number
}

const App = () => {
	const [msg, setMsg] = useState("Hi mom, I'm stateful")
	const [counter, setCounter] = useState(0)
	const [posts, setPosts] = useState<Post[]>([
		{ title: "React Rocks", likes: 1337},
		{ title: "JSX Rocks even more", likes: 42},
		{ title: "Got state!?", likes: 3},
	])

	const [isActive, setIsActive] = useState(false)

	const handleButtonClick = () => {
		setMsg("Bye mom")
		setCounter(counter+1)
	}

	const handleClick = () => {
		setIsActive(current => !current);
	}

	return (
		<div className="App">
			<h1>React basics</h1>

			<h2>{msg}</h2>

			<p>You have clicked the button {counter} times</p>

			<button onClick={handleButtonClick} className="btn btn-success btn-lg">👆 me!</button>

			<button className={isActive ? 'red' : 'blue'} onClick={() => {
				handleButtonClick()
				handleClick()
			}}>Try</button>

			<ul>
				{
					posts.map((post, index) => (
						<li key={index}>
							<p>Title: {post.title} ({post.likes} likes 👍)</p>
						</li>
					))
				}
			</ul>

		</div>
	)
}

export default App
