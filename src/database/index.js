const mongoose = require('mongoose')

//Trabalhando com ENV
require('dotenv/config');

mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4eb0q.mongodb.net/node_rest?retryWrites=true&w=majority`) //nome do banco de dados + conectar com mongo
mongoose.Promise = global.Promise

module.exports = mongoose