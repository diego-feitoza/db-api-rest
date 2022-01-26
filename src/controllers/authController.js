const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const authConfig = require('../config/auth')

const User = require('../models/user')

const router = express.Router()

function generateToken(params = {}){
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400
  } ) //simula login para token (valorUnico, hashUnico, tempo de expiração) é preciso criar um hash unico para a minha aplicação

}

router.post('/register', async (req, res) => {

  const { email } = req.body
  try{
    if(await User.findOne( { email } ))
      return res.status(400).send({'error': 'User alrady exists'})

    const user = await User.create(req.body) //req.body retorna os parametros da requisição

    user.password = undefined

    return res.send({
      user,
      token: generateToken({id: user.id})
    })
  }catch(err){
    return res.status(400).send({'error':'Registration failed'})
  }
})

router.post('/authenticate', async (req, res) => {
  const {email, password} = req.body
  
  const user = await User.findOne({email}).select('+password') //Retorna o password na leitura do usuário, quando estiver bloqueada

  if(!user)
    return res.status(400).send({error: 'User not found'})

  if(!await bcrypt.compare(password, user.password)) //compara se o password recebido é igual ao password salvo do usuário encontrado
    return res.status(400).send({error: 'Invalid password'})

  user.password = undefined

  const token = 
  res.send({user,
    token: generateToken({id: user.id})
  })
})

module.exports = app => app.use('/auth', router)

//Rota /auth/register vai ser criada *estudar mais essa parte de passar o valor de app por parametro do require*