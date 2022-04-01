import User from '../model/user.js'
import Article from '../model/article.js'

export const addComment = {
  path: '/api/articles/:name/add-comment',
  method: 'post',
  handler:  async (req, res) => {

    // Post request for adding comment
    const user = await User.findOne({ name:req.body.name })
    const text = req.body.text
    const article = await Article.findOne({ name:req.params.name })

    user.addComment(article, text)
    res.sendStatus(200)
  }
}