import Article from '../model/article.js'

export const articleInfo = {
  path: '/api/articles/:name',
  method: 'get',
  handler: async (req, res) => {
    // Get request for fetching article's info
    const article = await Article.findOne({ name:req.params.name })

    res.send(article)
  }
}