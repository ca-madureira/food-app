const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001
require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dbConnection = require('./utils/db')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

//middleware
app.use(cors())
app.use(express.json())

dbConnection()

app.post('/jwt', async (req, res) => {
  const user = req.body
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr',
  })
  res.send({ token })
})
const menuRoutes = require('./api/routes/menuRoutes')
const cartRoutes = require('./api/routes/cartRoutes')
const userRoutes = require('./api/routes/userRoutes')
const paymentRoutes = require('./api/routes/paymentRoutes')
app.use('/menu', menuRoutes)
app.use('/carts', cartRoutes)
app.use('/users', userRoutes)
app.use('/payments', paymentRoutes)

app.post('/create-payment-intent', async (req, res) => {
  const { price } = req.body
  const amount = price * 100

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: 'usd',

    payment_method_types: ['card'],
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})
app.get('/', (req, res) => {
  res.send('Hello Foodi Client Server!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
