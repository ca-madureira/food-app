const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('DB conectado com sucesso')
  } catch (error) {
    console.log('DB Error: ' + error)
  }
}

module.exports = dbConnection
