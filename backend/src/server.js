import express from 'express'
import usersRouter from './router/users-router.js'
import('./util/database-connection.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', usersRouter)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))
