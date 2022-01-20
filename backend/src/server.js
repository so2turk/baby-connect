import express from 'express'
import User from './model/user'
import Article from './model/article'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('./database-connection')

app.get('/initialize', async (req, res)=>{

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
})

// Post request for upvoting the articles
app.post('/api/articles/:name/upvote', async (req, res) => {
  const article = await Article.findOne({ name:req.params.name })
  const user = await User.findOne({ name:req.body.name })

  await user.upvoteArticle(article)
  res.sendStatus(200)
})

// Post request for adding comment
app.post('/api/articles/:name/add-comment', async (req, res) => {
  const user = await User.findOne({ name:req.body.name })
  const text = req.body.text
  const article = await Article.findOne({ name:req.params.name })

  user.addComment(article, text)
  res.sendStatus(200)
})

app.listen(8000, () => console.log('Listening on port 8000'))
