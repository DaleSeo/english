const router = require('express').Router()
const postSvc = require('../services/postService')

router.get('/:id', (req, res) => {
  postSvc.findOne(req.params.id)
    .then(doc => res.send(doc))
})

router.get('', (req, res) => {
  postSvc.find({page: req.query.page || 1})
    .then(docs => res.send(docs))
})

module.exports = router
