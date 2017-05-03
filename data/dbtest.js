const MongoClient = require('mongodb').MongoClient

const mongoUrl = process.env.MONGODB_URI

MongoClient.connect(mongoUrl)
  .then(db => db.collection('posts').findOne())
  .then(doc => console.log(doc))
