import express from 'express'
import { routes } from './routes/index.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

import('./util/database-connection.js')

const port = process.env.PORT || 3000

// Add all the routes to Express server
// exported from routes/index.js
routes.forEach(route => {
  app[route.method](route.path, route.handler);
});

app.listen(port, () => console.log(`Listening on port ${port}`))
