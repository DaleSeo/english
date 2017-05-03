const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const config = require('../config')

exports.find = function (options) {
  return MongoClient.connect(config.mongodbUri)
    .then(db => [
      db.collection('posts').find()
        .count(),
      db.collection('posts').find()
        .sort({_id: -1})
        .skip((options.page - 1) * 10)
        .limit(10)
        .toArray()
    ])
    .then(promises => Promise.all(promises))
    .then(values => {
      return {total: values[0], items: values[1]}
    })
}

exports.findOne = function (id) {
  return MongoClient.connect(config.mongodbUri)
    .then(db =>
      db.collection('posts')
        .findOne({_id: new ObjectID(id)})
    )
}
