import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const articleInfo = {
  'learn-react': {
    upvotes : 0
  },
  'learn-node': {
    upvotes : 0
  },
  'become-a-jr': {
    upvotes : 0
  }
}

// Setting up the requests
// app.get('/hello', (req, res) => res.send('Hi there'))
// app.get('/hello/:name', (req, res) => res.send(`Hi ${req.params.name}`))
// app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}. You ok?`))

app.post('/api/articles/:name/upvote', (req, res) => {
  const articleName = req.params.name
  articleInfo[articleName].upvotes += 1

  res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes} upvotes.`)
})

app.listen(8000, () => console.log('Listening on port 8000'))