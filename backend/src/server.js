import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

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

// Setting up the requests
// app.get('/hello', (req, res) => res.send('Hi there'))
// app.get('/hello/:name', (req, res) => res.send(`Hi ${req.params.name}`))
// app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}. You ok?`))

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