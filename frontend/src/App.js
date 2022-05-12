import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.css'
import HomePage from './pages/home'
import About from './pages/about'
import ArticlePage from './pages/article'
import ArticleListPage from './pages/article-list-page'
import NavBar from './navbar'
import Err404 from './pages/err404'

function App() {
	return (
		<Router>
			<div className="App">
				<NavBar />
				<div id="page-body">
					<Routes>
						<Route path="/" element={<HomePage />} exact />
						<Route path="/about" element={<About />} />
						<Route path="/article-list-page" element={<ArticleListPage />} />
						<Route path="/article/:name" element={<ArticlePage />} />
						<Route path="*" element={<Err404 />} />
					</Routes>
				</div>
			</div>
		</Router>
	)
}

export default App
