import express from 'express'
import User from './model/user'
import Article from './model/article'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

require('./database-connection')

const articleInfo = {
  'learn-react': {
    upvotes : 0,
    comments: []
  },
  'learn-node': {
    upvotes : 0,
    comments: []
  },
  'become-a-jr': {
    upvotes : 0,
    comments: []
  }
}

async function main (){

  const u1 = new User ({
    name: 'Serhat',
    email: 's@rhat.com',
    comments: [],
    upvotes: []
  }) 
  await u1.save()

  const u2 = new User ({
    name: 'Sevim',
    email: 's@vim.com',
    comments: [],
    upvotes: []
  })
  await u2.save()

  const u3 = new User ({
    name: 'Simone',
    email: 'sim@ne.com',
    comments: [],
    upvotes: []
  })
  await u3.save()

  const a1 = new Article({
    name: 'learn-react',
    upvotes: 0,
    comments: []
  })
  await a1.save()

  const a2 = new Article({
    name: 'learn-node',
    upvotes: 0,
    comments: []
  })
  await a2.save()

  const a3 = new Article({
    name: 'become-a-jr',
    upvotes: 0,
    comments: []
  })
  await a3.save()
}

main()

// Post request for upvoting the articles
app.post('/api/articles/:name/upvote', (req, res) => {
  const articleName = req.params.name
  articleInfo[articleName].upvotes += 1
  res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes} upvotes.`)
})

app.post('/api/articles/:name/add-comment', (req, res) => {
  const { username, text } = req.body
  const articleName = req.params.name
  articleInfo[articleName].comments.push({ username, text })
  res.status(200).send(articleInfo[articleName])
})

app.listen(8000, () => console.log('Listening on port 8000'))