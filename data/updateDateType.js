const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const moment = require('moment')

const mongoUrl = process.env.MONGODB_URI

MongoClient.connect(mongoUrl)
  .then(db => {
    db.collection('posts').find({}).skip(3000).limit(1000).toArray()
      .then(docs => {
        let promises = []
        docs.forEach(doc => {
          let date = moment(doc.date).toDate()
          let post = {createdDate: date, lastModifiedDate: date}
          let promise = db.collection('posts').updateOne({_id: new ObjectID(doc._id)}, {$set: post})
          promises.push(promise)
        })
        return promises
      })
      .then(promises => Promise.all(promises))
      .then(results => {
        results.forEach(result => {
          if (result.result.n !== 1) {
            console.log(result)
          }
        })
      })
      .catch(err => console.error(err))
      .then(_ => db.close())
  })
