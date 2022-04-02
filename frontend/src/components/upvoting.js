const Upvoting = ({ articleName, upvotes, setArticleInfo }) => {
	const upvoteArticle = async () => {
		const result = await fetch(`/api/articles/${articleName}/upvotes`, {
			method: 'post',
		})
		const body = await result.json()
		setArticleInfo(body)
	}

	return (
		<>
			<div id="upvotes-section">
				<button onClick={() => upvoteArticle()}>Upvote the Article</button>
				<p>This article has been upvoted {upvotes} times.</p>
			</div>
		</>
	)
}

export default Upvoting
