const { urlencoded } = require('express')
const express = require('express')
const { engine } = require('express-handlebars')

const generatePassword = require('./generate_password.js')

const app = express()
const port = 3000

app.engine('handlebars', engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Middlewares
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))

// Get Route
app
  .route('/')
  .get((req, res) => res.render('index'))

app
  .route('/')
  .post(generatePassword)

app.listen(port, () => console.log(`Express is listening on localhost:${port}`))