const express = require('express')
const User = require('../models/user')

const router = express.Router()

router.post('/register', async (req, res) => {

  const { email } = req.body
  try{
    if(await User.findOne( { email } ))
      return res.status(400).send({'error': 'user alrady exists'})

    const user = await User.create(req.body) //req.body retorna os parametros da requisição

    user.password = undefined

    return res.send({user})
  }catch(err){
    return res.status(400).send({'error':'registration failed'})
  }
})

module.exports = app => app.use('/auth', router)

//Rota /auth/register vai ser criada *estudar mais essa parte de passar o valor de app por parametro do require*