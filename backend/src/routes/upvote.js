import User from '../model/user.js'
import Article from '../model/article.js'

export const upvote = {
  path: '/api/articles/:name/upvote',
  method: 'post',
  handler: async (req, res)=>{

    // Post request for upvoting the articles with user info
    const article = await Article.findOne({ name:req.params.name })
    const user = await User.findOne({ name:req.body.name })

    await user.upvoteArticle(article)
    res.sendStatus(200)
  }
}