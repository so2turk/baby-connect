import express from 'express'
import User from './model/user.js'
import Article from './model/article.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

import('./database-connection.js')

const port = process.env.PORT || 8000

app.get('/initialize', async (req, res)=>{

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
})

// Post request for upvoting the articles with user info
app.post('/api/articles/:name/upvote', async (req, res) => {
  const article = await Article.findOne({ name:req.params.name })
  const user = await User.findOne({ name:req.body.name })

  await user.upvoteArticle(article)
  res.sendStatus(200)
})

// Post request for upvoting the articles without user info
app.post('/api/articles/:name/upvotes', async (req, res) => {
  const article = await Article.findOne({ name:req.params.name })

  article.upvotes += 1
  await article.save()
  res.send(article)
})

// Post request for adding comment
app.post('/api/articles/:name/add-comment', async (req, res) => {
  const user = await User.findOne({ name:req.body.name })
  const text = req.body.text
  const article = await Article.findOne({ name:req.params.name })

  user.addComment(article, text)
  res.sendStatus(200)
})

// Get request for fetching article's info
app.get('/api/articles/:name', async (req, res) => {
  const article = await Article.findOne({ name:req.params.name })

  res.send(article)
})

app.get("/", (req, res) => {
  res.send("lol")
})
app.listen(port, () => console.log(`Listening on port ${port}`))
