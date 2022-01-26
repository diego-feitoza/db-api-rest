const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

require('./controllers/authController')(app) // require()(esse valor repassa o valor de app para o require)
require('./controllers/projectController')(app) // require()(esse valor repassa o valor de app para o require)

//req => requisição
//res => responsta para enviar
app.get('/', (req, res) => {
  res.send('OK')
})

let port = process.env.PORT || 5050
app.listen(port)