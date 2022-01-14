import express from 'express'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

// Setting up the requests
app.get('/hello', (req, res) => res.send('Hi there'))
app.get('/hello/:name', (req, res) => res.send(`Hi ${req.params.name}`))
app.post('/hello', (req, res) => res.send(`Hello ${req.body.name}. You ok?`))


app.listen(8000, () => console.log('Listening on port 8000'))