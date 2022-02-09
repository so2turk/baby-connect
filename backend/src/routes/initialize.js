import User from '../model/user.js'
import Article from '../model/article.js'

export const initialize = {
  path: '/api/initialize',
  method: 'get',
  handler: async (req, res)=>{

    const u0 = await User.create ({
      name: 'Anonymous',
      email: 'an@n.com',
      comments: [],
      upvotes: []
    })
    const u1 = await User.create ({
      name: 'Serhat',
      email: 's@rhat.com',
      comments: [],
      upvotes: []
    })

    const u2 = await User.create ({
      name: 'Sevim',
      email: 's@vim.com',
      comments: [],
      upvotes: []
    })

    const u3 = await User.create ({
      name: 'Simone',
      email: 'sim@ne.com',
      comments: [],
      upvotes: []
    })

    const a1 = await Article.create ({
      name: 'learn-react',
      upvotes: 0,
      comments: []
    })

    const a2 = await Article.create ({
      name: 'learn-node',
      upvotes: 0,
      comments: []
    })

    const a3 = await Article.create ({
      name: 'become-a-jr',
      upvotes: 0,
      comments: []
    })

    await u1.upvoteArticle(a3)
    await u2.upvoteArticle(a2)
    await u3.upvoteArticle(a1)
    await u1.addComment(a3, 'Amazing.. unbelivable')
    await u2.addComment(a2, 'Not that I expected.. could be better!')
    await u3.addComment(a1, 'Agu.. agu..')

    res.sendStatus(200)
  }
}
