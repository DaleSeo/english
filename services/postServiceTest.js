const postService = require('./postService')

postService.find()
  .then(docs =>
    console.log(docs))
