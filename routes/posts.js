const router = require('express').Router()
const postSvc = require('../services/postService')

router.get('/', (req, res) => {
  postSvc.find({page: req.query.page || 1})
    .then(docs => res.send(docs))
})

module.exports = router
