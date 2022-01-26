const mongoose = require('../database')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    unique: true, //valor unico
    require: true,
    lowercase: true //força o LowerCase
  },
  password: {
    type: String,
    require: true,
    select: false //Informação não vai ser exibida ao consultar a lista de usuarios
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})

UserSchema.pre('save', async function(next){
  {
    const hash = await bcrypt.hash(this.password, 10) //(password para hash, quantidade de caracteres do hash)
    this.password = hash
  
    next()  
  }
}) //função do mongoose para ser execultada antes de chamar o schema

const User = mongoose.model('User', UserSchema)

module.exports = User