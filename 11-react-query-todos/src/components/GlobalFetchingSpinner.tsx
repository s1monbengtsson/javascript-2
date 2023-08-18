import { useIsFetching } from '@tanstack/react-query'

const GlobalFetchingSpinner = () => {
	const isFetching = useIsFetching()

	return isFetching ? (
		<div id="cat-spinner" className="d-flex">
			<div className="cat">👀</div>
			<div className="cat">🤢</div>
			<div className="cat">🤮</div>
		</div>
	) : null
}

export default GlobalFetchingSpinner
