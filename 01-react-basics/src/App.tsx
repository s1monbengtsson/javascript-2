import { useState } from 'react'
import './App.css'
import ClickCounter from './components/ClickCounter'
import Salary from './components/Salary'

type Post = {
	title: string
	likes: number
}

const App = () => {
	const [msg, setMsg] = useState("Hi mom, I'm stateful")
	const [posts, setPosts] = useState<Post[]>([
		{ title: "React Rocks 🤘🏻!", likes: 1337 },  // 0xAF
		{ title: "JSX Rocks Even Moar 🤘🏻!", likes: 42 },  // 0x1336
		{ title: "Got state?", likes: 3 },  // 0x420
	])

	// input state
	const [newPostTitle, setNewPostTitle] = useState("")
	

	const handleAddLike = (post: Post) => {
		post.likes++
		setPosts([...posts])
	}


	const handleRemovePost = (postToDelete: Post) => {
		setPosts(posts.filter(post => post !== postToDelete))
	}

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// add a new post to the posts state
		const newPost: Post = { title: newPostTitle, likes: 0}
		setPosts([...posts, newPost])

		// clear newPostTitle state
		setNewPostTitle("")
	}

	console.log("Rendering...")

	return (
		<div className="App">

			<h1>React Basics</h1>
			<h2>{msg}</h2>

			<button onClick={ () => { setMsg('Hi dad!') } } className="btn btn-warning btn-lg">Hi dad!</button>

			<hr />

			<ClickCounter />

			<hr />

			<Salary />

			<hr />

			<h2>Posts</h2>

			<form onSubmit={handleFormSubmit}>
				<div className="input-group mb-3">
					<input 
						type="text" 
						className="form-control" 
						placeholder="Post title" 
						onChange={e => setNewPostTitle(e.target.value)}
						value={newPostTitle}
						required
						minLength={3}
					/>
					<button 
						type="submit" 
						className="btn btn-primary"
						>Create
					</button>
				</div>
			</form>

			{posts.length > 0 && (
				<ul>
					{
						posts.map( (post, index) => (
							<li key={index}>
								{post.title} ({post.likes} likes)
								<button
									className="btn btn-success btn-sm ms-1"
									onClick={() => handleAddLike(post)}
								>❤️</button>
								<button
									className="btn btn-warning btn-sm ms-1"	
									onClick={() => handleRemovePost(post)}
								>❌</button>
							</li>
						))
					}
			</ul>
			)}

			{posts.length === 0 && (<p>There are no available posts</p>)}
		</div>
	)
}

export default App