import Article from '../model/article.js'

export const upvotes = {
  path: '/api/articles/:name/upvotes',
  method: 'post',
  handler: async (req, res)=>{

    // Post request for upvoting the articles without user info
    const article = await Article.findOne({ name:req.params.name })

    article.upvotes += 1
    await article.save()
    res.send(article)
  }
}