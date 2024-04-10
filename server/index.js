const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 6001
require('dotenv').config()

//middleware
app.use(cors())
app.use(express.json())

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qo7gh4h.mongodb.net/app?retryWrites=true&w=majority&appName=Cluster0`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect()

    const menuCollections = client.db('restaurant').collection('menus')
    const cartCollections = client.db('restaurant').collection('carts')

    app.get('/menu', async (req, res) => {
      const result = await menuCollections.find().toArray()
      res.send(result)
    })

    app.post('/carts', async (req, res) => {
      const cartItem = req.body
      const result = await cartCollections.insertOne(cartItem)
      res.send(result)
    })

    app.get('/carts', async (req, res) => {
      const email = req.query.email
      const filter = { email: email }
      const result = await cartCollections.find(filter).toArray()
      res.send(result)
    })

    app.get('/carts/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const result = await cartCollections.findOne(filter)
      res.send(result)
    })

    app.delete('/carts/:id', async (req, res) => {
      const id = req.params.id
      const filter = { _id: new ObjectId(id) }
      const result = await cartCollections.deleteOne(filter)
      res.send(result)
    })

    app.put('/carts/:id', async (req, res) => {
      const id = req.params.id
      const { quantity } = req.body
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          quantity: parseInt(quantity, 10),
        },
      }
      const result = await cartCollections.updateOne(filter, updateDoc, options)
    })

    await client.db('admin').command({ ping: 1 })
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    )
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(port, () => {
  console.log(`rodando na porta ${port}`)
})
